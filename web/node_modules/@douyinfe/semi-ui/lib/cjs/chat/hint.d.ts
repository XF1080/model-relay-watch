import React from "react";
interface HintProps {
    className?: string;
    style?: React.CSSProperties;
    value?: string[];
    onHintClick?: (item: string) => void;
    renderHintBox?: (props: {
        content: string;
        index: number;
        onHintClick: () => void;
    }) => React.ReactNode;
}
declare const Hint: React.MemoExoticComponent<(props: HintProps) => React.JSX.Element>;
export default Hint;
