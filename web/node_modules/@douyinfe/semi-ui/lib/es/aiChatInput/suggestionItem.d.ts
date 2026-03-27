import React, { ReactNode } from 'react';
import { Suggestion, RenderSuggestionItemProps } from './interface';
interface SuggestionItemProps {
    suggestion: Suggestion;
    isActive?: boolean;
    renderSuggestionItem?: (props: RenderSuggestionItemProps) => ReactNode;
    onClick?: (suggestion: Suggestion) => void;
    index?: number;
    onMouseEnter?: (index: number) => void;
}
declare const SuggestionItem: React.MemoExoticComponent<(props: SuggestionItemProps) => React.JSX.Element>;
export default SuggestionItem;
