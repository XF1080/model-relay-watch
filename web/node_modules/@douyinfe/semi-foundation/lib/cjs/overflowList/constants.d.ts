declare const cssClasses: {
    PREFIX: string;
};
declare const strings: {
    BOUNDARY_SET: ("end" | "start")[];
    POSITION_SET: string[];
    MODE_SET: string[];
    MODE_MAP: {
        COLLAPSE: string;
        SCROLL: string;
    };
    BOUNDARY_MAP: {
        readonly START: "start";
        readonly END: "end";
    };
    OVERFLOW_DIR: {
        NONE: number;
        GROW: number;
        SHRINK: number;
    };
};
declare const numbers: {
    MINIMUM_HTML_ELEMENT_WIDTH: number;
};
export { cssClasses, strings, numbers };
