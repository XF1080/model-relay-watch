declare const cssClasses: {
    PREFIX: string;
    PREFIX_ACTION: string;
    PREFIX_CONTENT: string;
    PREFIX_REASONING: string;
    PREFIX_ANNOTATION: string;
    PREFIX_REFERENCES: string;
    PREFIX_REFERENCE: string;
    PREFIX_STEP: string;
    PREFIX_CODE: string;
    PREFIX_HINT: string;
};
declare const strings: {
    SCROLL_ANIMATION_TIME: number;
    SHOW_SCROLL_GAP: number;
    STATUS: {
        QUEUED: string;
        IN_PROGRESS: string;
        INCOMPLETE: string;
        COMPLETED: string;
        FAILED: string;
        CANCELLED: string;
    };
    ROLE: {
        USER: string;
        ASSISTANT: string;
        SYSTEM: string;
    };
    DIALOGUE_ALIGN: {
        LEFT_RIGHT: string;
        LEFT_ALIGN: string;
    };
    MODE: {
        BUBBLE: string;
        NO_BUBBLE: string;
        USER_BUBBLE: string;
    };
    SEND_HOT_KEY: {
        ENTER: string;
        SHIFT_PLUS_ENTER: string;
    };
    MESSAGE_ITEM_TYPE: {
        MESSAGE: string;
        OUTPUT_TEXT: string;
        REFUSAL: string;
        FILE_SEARCH_CALL: string;
        FUNCTION_CALL: string;
        WEB_SEARCH_CALL: string;
        REASONING: string;
        MCP_CALL: string;
        CUSTOM_TOOL_CALL: string;
        IMAGE_GENERATION_CALL: string;
        MCP_LIST_TOOLS: string;
        INPUT_TEXT: string;
        INPUT_IMAGE: string;
        INPUT_FILE: string;
        STEPS: string;
        ITEM_REFERENCE: string;
    };
    FINISH_REASON: {
        STOP: string;
        LENGTH: string;
        CONTENT_FILTER: string;
        TOOL_CALLS: string;
        FUNCTION_CALL: string;
    };
    TEXT_TYPES: string[];
    TOOL_CALL_TYPES: string[];
    DOCUMENT_TYPES: string[];
    IMAGE_TYPES: string[];
    PDF_TYPES: string[];
    EXCEL_TYPES: string[];
    CODE_TYPES: string[];
    VIDEO_TYPES: string[];
};
export { cssClasses, strings };
