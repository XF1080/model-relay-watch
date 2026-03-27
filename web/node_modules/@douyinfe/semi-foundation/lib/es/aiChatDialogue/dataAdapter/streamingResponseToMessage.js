/**
 * Incremental reducer for streaming Response chunks with out-of-order handling.
 * 增量处理流式响应块的归约器，支持无序处理。
 *
 * ## Features / 特性
 * - Only applies chunks that were not processed before (by sequence_number)
 *   只处理之前未处理过的块（根据 sequence_number）
 *
 * - Maintains reusable state across calls for incremental processing
 *   在多次调用之间保持可复用的状态，支持增量处理
 *
 * - Always returns a best-effort Message regardless of missing chunks
 *   即使有缺失的块，也总是返回尽力而为的消息
 *
 * - Handles out-of-order chunks by buffering and processing in sequence
 *   通过缓冲机制处理无序到达的块，确保按顺序处理
 *
 * ## Out-of-Order Handling / 无序处理机制
 *
 * 1. **Buffering / 缓冲**
 *    - All incoming chunks are first added to a buffer
 *      所有传入的块首先被添加到缓冲区
 *    - Chunks are stored by their sequence_number as keys
 *      块按其 sequence_number 作为键存储
 *
 * 2. **Sequential Processing / 顺序处理**
 *    - Only processes chunks with consecutive sequence numbers
 *      仅处理具有连续序列号的块
 *    - Maintains lastProcessedSeq to track the last successfully processed sequence
 *      维护 lastProcessedSeq 来跟踪最后成功处理的序列号
 *    - Uses a do-while loop to process all available consecutive chunks
 *      使用 do-while 循环处理所有可用的连续块
 *
 * 3. **Tolerance Mechanism / 容错机制**
 *    - If gap between buffered chunks and lastProcessedSeq exceeds MAX_GAP (10)
 *      如果缓冲块与 lastProcessedSeq 之间的间隙超过 MAX_GAP (10)
 *    - Assumes missing chunks won't arrive and processes remaining chunks
 *      则假设缺失的块不会到达，继续处理剩余的块
 *    - Prevents permanent blocking due to lost chunks
 *      防止因丢失块而永久阻塞
 *
 * ## Example Scenarios / 示例场景
 *
 * - **Scenario 1 / 场景 1**: In-order arrival / 按序到达
 *   ```
 *   Input: [1, 2, 3] → Process: 1, 2, 3 immediately
 *   输入: [1, 2, 3] → 处理: 立即处理 1, 2, 3
 *   ```
 *
 * - **Scenario 2 / 场景 2**: Out-of-order arrival / 无序到达
 *   ```
 *   Call 1: [1, 3] → Process: 1, Buffer: 3
 *   Call 2: [2, 4] → Process: 2, 3, 4
 *   调用 1: [1, 3] → 处理: 1，缓冲: 3
 *   调用 2: [2, 4] → 处理: 2, 3, 4
 *   ```
 *
 * - **Scenario 3 / 场景 3**: Missing chunk with recovery / 缺失块并恢复
 *   ```
 *   Input: [1, 2, 4, 5, ..., 15] → Process: 1, 2, buffer others
 *   After gap > 10 → Skip 3, process 4-15
 *   输入: [1, 2, 4, 5, ..., 15] → 处理: 1, 2，缓冲其他
 *   间隙 > 10 后 → 跳过 3，处理 4-15
 *   ```
 *
 * @param chunks - Array of incoming response chunks / 传入的响应块数组
 * @param prevState - Previous state from last call (for incremental processing) / 上次调用的状态（用于增量处理）
 * @returns Object containing the accumulated message and next state, or null if no chunks / 包含累积消息和下一个状态的对象，如果没有块则返回 null
 */
export default function streamingResponseToMessage(chunks, prevState) {
  var _a, _b, _c, _d;
  if (!(chunks === null || chunks === void 0 ? void 0 : chunks.length)) return null;
  // Fast path: If last chunk is response.completed, return the complete response directly
  // 快速路径：如果最后一个块是 response.completed，直接返回完整响应
  const tail = chunks[chunks.length - 1];
  if (tail.type === 'response.completed') {
    const {
      response
    } = tail;
    const {
      id,
      model,
      status,
      output,
      output_text,
      created_at
    } = response;
    const message = {
      id: id,
      role: "assistant",
      content: output,
      createdAt: created_at,
      output_text: output_text,
      model: model,
      status: status
    };
    return {
      message,
      nextState: null
    };
  }
  // Initialize or restore state from previous call
  // 初始化或从上次调用恢复状态
  const state = prevState ? {
    // Restore existing state for incremental processing / 恢复现有状态以进行增量处理
    processedSeq: new Set(prevState.processedSeq),
    outputs: new Map(prevState.outputs),
    meta: Object.assign({}, prevState.meta),
    error: (_a = prevState.error) !== null && _a !== void 0 ? _a : null,
    buffer: new Map(prevState.buffer),
    lastProcessedSeq: (_b = prevState.lastProcessedSeq) !== null && _b !== void 0 ? _b : -1 // Last successfully processed sequence / 最后成功处理的序列号
  } : {
    // Initialize fresh state / 初始化全新状态
    processedSeq: new Set(),
    outputs: new Map(),
    meta: {},
    error: null,
    buffer: new Map(),
    lastProcessedSeq: -1 // Start with -1, so first expected sequence is 0 / 从 -1 开始，因此第一个预期序列是 0
  };
  // Filter out chunks already processed in previous calls / 过滤掉之前调用中已处理的块
  const incoming = Array.isArray(chunks) ? chunks : [];
  const unprocessed = incoming.filter(c => {
    const seq = c === null || c === void 0 ? void 0 : c.sequence_number;
    return typeof seq !== 'number' || !state.processedSeq.has(seq);
  });
  // Add unprocessed chunks to buffer / 将未处理的块添加到缓冲区
  for (const chunk of unprocessed) {
    const seq = chunk === null || chunk === void 0 ? void 0 : chunk.sequence_number;
    if (typeof seq === 'number') {
      // Store chunk with its sequence number as key / 使用序列号作为键存储块
      state.buffer.set(seq, chunk);
    } else {
      // Handle chunks without sequence_number by assigning a decimal key
      // 通过分配小数键来处理没有 sequence_number 的块
      // 
      // Using +0.5 provides a temporary unique "sequence" for chunks without sequence_number.
      // This avoids key conflicts with existing integer sequence numbers.
      // 使用 +0.5 为没有 sequence_number 的块提供一个临时且唯一的"顺序"。
      // 这样可以避免与现有的整数序列号发生键冲突。
      // 
      // Why +0.5 instead of +1?
      // 为什么使用 +0.5 而不是 +1？
      // - Using lastProcessedSeq+1 could conflict with future sequence numbers
      //   使用 lastProcessedSeq+1 可能与未来的序列号冲突
      // - +0.5 allows insertion between sequences while guaranteeing uniqueness and monotonic increase
      //   +0.5 可以插入到序列之间，同时保证唯一性和单调递增
      state.buffer.set(state.lastProcessedSeq + 0.5, chunk);
    }
  }
  // Define the chunk processing function that handles different chunk types
  // 定义处理不同块类型的函数
  const processChunk = chunk => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
    switch (chunk.type) {
      // ========== Response Metadata / 响应元数据 ==========
      case 'response.created':
        {
          // Initialize response metadata (id, model, status, timestamp)
          // 初始化响应元数据（id、模型、状态、时间戳）
          const {
            response
          } = chunk;
          if (response) {
            state.meta.id = (_a = response.id) !== null && _a !== void 0 ? _a : state.meta.id;
            state.meta.model = (_b = response.model) !== null && _b !== void 0 ? _b : state.meta.model;
            state.meta.status = (_c = response.status) !== null && _c !== void 0 ? _c : state.meta.status;
            state.meta.created_at = (_d = response.created_at) !== null && _d !== void 0 ? _d : state.meta.created_at;
          }
          break;
        }
      // ========== Output Items / 输出项 ==========
      case 'response.output_item.added':
        {
          // Add a new output item placeholder / 添加新的输出项占位符
          // Deep clone to avoid modifying original chunk.item / 深拷贝以避免修改原始 chunk.item
          const outIdx = typeof chunk.output_index === 'number' ? chunk.output_index : 0;
          if (!state.outputs.has(outIdx)) {
            state.outputs.set(outIdx, deepClone((_e = chunk.item) !== null && _e !== void 0 ? _e : {}));
          }
          break;
        }
      case 'response.output_item.done':
        {
          // Finalize an output item / 完成一个输出项
          // Deep clone to avoid modifying original item / 深拷贝以避免修改原始 item
          const {
            output_index,
            item
          } = chunk;
          state.outputs.set(output_index, deepClone(item));
          break;
        }
      // ========== Output Text / 输出文本 ==========
      case 'response.content_part.added':
      case 'response.content_part.done':
        {
          const {
            output_index,
            content_index,
            part
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_f = item.content) !== null && _f !== void 0 ? _f : [];
          item.content[content_index] = deepClone(part);
          break;
        }
      case 'response.output_text.delta':
        {
          // Incrementally append text delta to the output / 增量追加文本增量到输出
          const {
            output_index,
            content_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_g = item.content) !== null && _g !== void 0 ? _g : [];
          item.content[content_index] = (_h = item.content[content_index]) !== null && _h !== void 0 ? _h : {
            type: 'output_text',
            text: ''
          };
          item.content[content_index].text = ((_j = item.content[content_index].text) !== null && _j !== void 0 ? _j : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.output_text.done':
        {
          // Set final text content / 设置最终文本内容
          const {
            output_index,
            content_index,
            text
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_k = item.content) !== null && _k !== void 0 ? _k : [];
          item.content[content_index] = (_l = item.content[content_index]) !== null && _l !== void 0 ? _l : {
            type: 'output_text',
            text: ''
          };
          item.content[content_index].text = text;
          break;
        }
      case 'response.output_text.annotation.added':
        {
          // Add annotation to text output / 向文本输出添加注释
          const {
            output_index,
            content_index,
            annotation_index,
            annotation
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_m = item.content) !== null && _m !== void 0 ? _m : [];
          item.content[content_index] = (_o = item.content[content_index]) !== null && _o !== void 0 ? _o : {
            type: 'output_text',
            text: '',
            annotations: []
          };
          item.content[content_index].annotations = (_p = item.content[content_index].annotations) !== null && _p !== void 0 ? _p : [];
          item.content[content_index].annotations[annotation_index] = deepClone(annotation);
          break;
        }
      // ========== Refusal / 拒绝响应 ==========
      case 'response.refusal.delta':
        {
          const {
            output_index,
            content_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_q = item.content) !== null && _q !== void 0 ? _q : [];
          item.content[content_index] = (_r = item.content[content_index]) !== null && _r !== void 0 ? _r : {
            type: 'refusal',
            refusal: ''
          };
          item.content[content_index].refusal = ((_s = item.content[content_index].refusal) !== null && _s !== void 0 ? _s : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.refusal.done':
        {
          const {
            output_index,
            content_index,
            refusal
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_t = item.content) !== null && _t !== void 0 ? _t : [];
          item.content[content_index] = (_u = item.content[content_index]) !== null && _u !== void 0 ? _u : {
            type: 'refusal',
            refusal: ''
          };
          item.content[content_index].refusal = refusal;
          break;
        }
      // reasoning
      case 'response.reasoning_summary_part.added':
      case 'response.reasoning_summary_part.done':
        {
          const {
            output_index,
            summary_index,
            part
          } = chunk;
          const item = state.outputs.get(output_index);
          item.summary = (_v = item.summary) !== null && _v !== void 0 ? _v : [];
          item.summary[summary_index] = deepClone(part);
          break;
        }
      case 'response.reasoning_summary_text.delta':
        {
          const {
            output_index,
            summary_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.summary = (_w = item.summary) !== null && _w !== void 0 ? _w : [];
          item.summary[summary_index] = (_x = item.summary[summary_index]) !== null && _x !== void 0 ? _x : {
            type: 'reasoning',
            text: ''
          };
          item.summary[summary_index].text = ((_y = item.summary[summary_index].text) !== null && _y !== void 0 ? _y : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.reasoning_summary_text.done':
        {
          const {
            output_index,
            summary_index,
            text
          } = chunk;
          const item = state.outputs.get(output_index);
          item.summary = (_z = item.summary) !== null && _z !== void 0 ? _z : [];
          item.summary[summary_index] = (_0 = item.summary[summary_index]) !== null && _0 !== void 0 ? _0 : {
            type: 'reasoning',
            text: ''
          };
          item.summary[summary_index].text = text;
          break;
        }
      case 'response.reasoning_text.delta':
        {
          const {
            output_index,
            content_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_1 = item.content) !== null && _1 !== void 0 ? _1 : [];
          item.content[content_index] = (_2 = item.content[content_index]) !== null && _2 !== void 0 ? _2 : {
            type: 'reasoning',
            text: ''
          };
          item.content[content_index].text = ((_3 = item.content[content_index].text) !== null && _3 !== void 0 ? _3 : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.reasoning_text.done':
        {
          const {
            output_index,
            content_index,
            text
          } = chunk;
          const item = state.outputs.get(output_index);
          item.content = (_4 = item.content) !== null && _4 !== void 0 ? _4 : [];
          item.content[content_index] = (_5 = item.content[content_index]) !== null && _5 !== void 0 ? _5 : {
            type: 'reasoning',
            text: ''
          };
          item.content[content_index].text = text;
          break;
        }
      // function call
      case 'response.function_call_arguments.delta':
        {
          const {
            output_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.arguments = ((_6 = item.arguments) !== null && _6 !== void 0 ? _6 : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.function_call_arguments.done':
        {
          const {
            output_index,
            name
          } = chunk;
          const item = state.outputs.get(output_index);
          item.arguments = chunk.arguments;
          item.name = name;
          break;
        }
      // custom_tool_call
      case 'response.custom_tool_call_input.delta':
        {
          const {
            output_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.input = ((_7 = item.input) !== null && _7 !== void 0 ? _7 : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.custom_tool_call_input.done':
        {
          const {
            output_index,
            input
          } = chunk;
          const item = state.outputs.get(output_index);
          item.input = input;
          break;
        }
      // mcp
      case 'response.mcp_call_arguments.delta':
        {
          const {
            output_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.arguments = ((_8 = item.arguments) !== null && _8 !== void 0 ? _8 : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.mcp_call_arguments.done':
        {
          const {
            output_index
          } = chunk;
          const item = state.outputs.get(output_index);
          item.arguments = chunk.arguments;
          break;
        }
      case 'response.file_search_call.in_progress':
      case 'response.web_search_call.in_progress':
      case 'response.image_generation_call.in_progress':
      case 'response.mcp_call.in_progress':
      case 'response.mcp_list_tools.in_progress':
      case 'response.code_interpreter_call.in_progress':
        {
          const out = state.outputs.get(chunk.output_index);
          if (out) out.status = 'in_progress';
          break;
        }
      case 'response.mcp_call.failed':
      case 'response.mcp_list_tools.failed':
        {
          const out = state.outputs.get(chunk.output_index);
          if (out) out.status = 'failed';
          break;
        }
      case 'response.file_search_call.completed':
      case 'response.web_search_call.completed':
      case 'response.image_generation_call.completed':
      case 'response.mcp_call.completed':
      case 'response.mcp_list_tools.completed':
      case 'response.code_interpreter_call.completed':
        {
          const out = state.outputs.get(chunk.output_index);
          if (out) out.status = 'completed';
          break;
        }
      case 'response.code_interpreter_call_code.delta':
        {
          const {
            output_index,
            delta
          } = chunk;
          const item = state.outputs.get(output_index);
          item.code = ((_9 = item.code) !== null && _9 !== void 0 ? _9 : '') + (delta !== null && delta !== void 0 ? delta : '');
          break;
        }
      case 'response.code_interpreter_call_code.done':
        {
          const {
            output_index,
            code
          } = chunk;
          const item = state.outputs.get(output_index);
          item.code = code;
          break;
        }
      case 'response.image_generation_call.partial_image':
        {
          const item = state.outputs.get(chunk.output_index);
          if (item) item.result = chunk.partial_image_b64;
          break;
        }
      case 'error':
        {
          state.error = {
            code: chunk.code,
            message: chunk.message
          };
          break;
        }
      case 'response.completed':
        {
          if (chunk.response) {
            state.meta.status = (_10 = chunk.response.status) !== null && _10 !== void 0 ? _10 : 'completed';
          } else {
            state.meta.status = 'completed';
          }
          break;
        }
      default:
        {
          // Ignore unsupported chunk types / 忽略不支持的块类型
          break;
        }
    }
  };
  // ==================== Sequential Processing / 顺序处理 ====================
  // Process chunks in sequential order from the buffer
  // Only chunks with consecutive sequence numbers are processed
  // 从缓冲区按顺序处理块
  // 只处理具有连续序列号的块
  let nextExpected = state.lastProcessedSeq + 1; // Next sequence number we're waiting for / 我们等待的下一个序列号
  let processed = false; // Flag to track if any chunk was processed in this iteration / 标记此次迭代中是否处理了任何块
  do {
    processed = false;
    const chunk = state.buffer.get(nextExpected);
    if (chunk) {
      // Found the next expected chunk, process it / 找到下一个预期的块，处理它
      processChunk(chunk);
      state.processedSeq.add(nextExpected); // Mark as processed / 标记为已处理
      state.buffer.delete(nextExpected); // Remove from buffer / 从缓冲区移除
      state.lastProcessedSeq = nextExpected; // Update last processed sequence / 更新最后处理的序列号
      nextExpected++; // Move to next expected sequence / 移动到下一个预期序列
      processed = true; // Continue the loop to check for more consecutive chunks / 继续循环检查更多连续块
    } else {
      // Check for chunks without sequence numbers (stored with decimal keys like N.5)
      // 检查没有序列号的块（使用小数键存储，如 N.5）
      const decimalKey = state.lastProcessedSeq + 0.5;
      const noSeqChunk = state.buffer.get(decimalKey);
      if (noSeqChunk) {
        processChunk(noSeqChunk);
        state.buffer.delete(decimalKey);
        state.lastProcessedSeq = nextExpected; // Update last processed sequence / 更新最后处理的序列号
        nextExpected++; // Move to next expected sequence / 移动到下一个预期序列
        processed = true; // Continue to check for next integer sequence / 继续检查下一个整数序列
      }
    }
  } while (processed); // Keep processing as long as we find consecutive chunks / 只要找到连续的块就继续处理
  // ==================== Tolerance Mechanism / 容错机制 ====================
  // Handle permanent missing chunks to prevent infinite waiting
  // If the gap between buffered chunks and last processed sequence exceeds MAX_GAP,
  // assume missing chunks won't arrive and continue processing remaining chunks
  // 处理永久缺失的块以防止无限等待
  // 如果缓冲块与最后处理序列之间的间隙超过 MAX_GAP，
  // 则假设缺失的块不会到达，继续处理剩余的块
  const MAX_GAP = 10; // Maximum allowed gap before assuming chunks are permanently lost / 在假设块永久丢失之前允许的最大间隙
  // Extract all integer sequence numbers from buffer and sort them
  // 从缓冲区提取所有整数序列号并排序
  const bufferedSeqs = Array.from(state.buffer.keys()).filter(k => typeof k === 'number' && k === Math.floor(k)) // Only integer keys / 只要整数键
  .sort((a, b) => a - b); // Sort in ascending order / 升序排序
  if (bufferedSeqs.length > MAX_GAP) {
    // Gap is too large, assume intermediate chunks are lost
    // Process all remaining buffered chunks in order
    // 间隙太大，假设中间的块已丢失
    // 按顺序处理所有剩余连续块
    let lastSeq = state.lastProcessedSeq;
    for (const seq of bufferedSeqs) {
      if (seq === lastSeq + 1) {
        const chunk = state.buffer.get(seq);
        if (chunk) {
          processChunk(chunk);
          state.processedSeq.add(seq);
          state.buffer.delete(seq);
          state.lastProcessedSeq = seq;
          lastSeq = seq;
        }
      } else {
        break;
      }
    }
  }
  // ==================== Build Final Message / 构建最终消息 ====================
  const content = Array.from(state.outputs.values()).filter(item => item !== null);
  // Extract and concatenate all text content for convenience
  // 提取并连接所有文本内容以便使用
  const output_text = content.filter(p => (p === null || p === void 0 ? void 0 : p.type) === 'output_text') // Only text items / 只要文本项
  .map(p => {
    var _a;
    return (_a = p === null || p === void 0 ? void 0 : p.text) !== null && _a !== void 0 ? _a : '';
  }) // Extract text / 提取文本
  .join(''); // Join into single string / 连接成单个字符串
  // Build the message object if we have any content or metadata
  // 如果有任何内容或元数据，则构建消息对象
  const message = (content === null || content === void 0 ? void 0 : content.length) || state.meta.id ? {
    id: state.meta.id,
    role: "assistant",
    content,
    createdAt: state.meta.created_at,
    output_text,
    model: state.meta.model,
    status: (_c = state.meta.status) !== null && _c !== void 0 ? _c : 'in_progress',
    error: (_d = state.error) !== null && _d !== void 0 ? _d : null // Include error if any / 包含错误（如果有）
  } : null;
  return {
    message,
    nextState: state
  };
}
/**
 * Deep clone an object to avoid modifying original data
 * 深拷贝对象以避免修改原始数据
 *
 * @param obj - Object to clone / 要克隆的对象
 * @returns Cloned object / 克隆的对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}