import type { MCPOption } from './mcpCofContentFoundation';
export declare function getFilterResult(inputValue: string, options?: MCPOption[], customFilter?: (value: string, option: MCPOption) => boolean): MCPOption[];
export declare function baseFilter(value: string, option: MCPOption): boolean;
