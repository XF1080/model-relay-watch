import { ContentItem, Message } from "../foundation";
import { ResponseChunk, StreamingResponseState } from "./interface";
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
export default function streamingResponseToMessage(chunks?: ResponseChunk[], prevState?: StreamingResponseState): {
    message: {
        id: string;
        role: string;
        content: ContentItem | ContentItem[];
        createdAt: number;
        output_text: string;
        model: string;
        status: string;
    };
    nextState: any;
} | {
    message: Message;
    nextState: {
        processedSeq: Set<number>;
        outputs: Map<number, ContentItem>;
        meta: {
            id?: string;
            model?: string;
            status?: string;
            created_at?: number;
        };
        error: import("./interface").ResponseError;
        buffer: Map<number, ResponseChunk>;
        lastProcessedSeq: number;
    };
};
