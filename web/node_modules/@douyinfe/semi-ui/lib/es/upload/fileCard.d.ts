import React, { ReactNode, MouseEvent, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { FileCardAdapter } from '@douyinfe/semi-foundation/lib/es/upload/fileCardFoundation';
import { Locale } from '../locale/interface';
import BaseComponent from '../_base/baseComponent';
import { RenderFileItemProps } from './interface';
import { ShowTooltip } from '../typography';
export interface FileCardProps extends RenderFileItemProps {
    className?: string;
    style?: CSSProperties;
    picWidth?: string | number;
    picHeight?: string | number;
    showTooltip?: boolean | ShowTooltip;
}
export interface FileCardState {
    fallbackPreview?: boolean;
}
declare class FileCard extends BaseComponent<FileCardProps, FileCardState> {
    static propTypes: {
        className: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        listType: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        onPreviewClick: PropTypes.Requireable<(...args: any[]) => any>;
        onRemove: PropTypes.Requireable<(...args: any[]) => any>;
        onReplace: PropTypes.Requireable<(...args: any[]) => any>;
        onRetry: PropTypes.Requireable<(...args: any[]) => any>;
        percent: PropTypes.Requireable<number>;
        preview: PropTypes.Requireable<boolean>;
        previewFile: PropTypes.Requireable<(...args: any[]) => any>;
        picWidth: PropTypes.Requireable<NonNullable<string | number>>;
        picHeight: PropTypes.Requireable<NonNullable<string | number>>;
        showReplace: PropTypes.Requireable<boolean>;
        showRetry: PropTypes.Requireable<boolean>;
        size: PropTypes.Requireable<NonNullable<string | number>>;
        status: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        url: PropTypes.Requireable<string>;
        validateMessage: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        index: PropTypes.Requireable<number>;
        showTooltip: PropTypes.Requireable<NonNullable<boolean | object>>;
    };
    static defaultProps: {
        listType: "list";
        name: string;
        onRemove: () => void;
        onRetry: () => void;
        preview: boolean;
        size: string;
        showTooltip: boolean;
    };
    constructor(props: FileCardProps);
    get adapter(): FileCardAdapter<FileCardProps, FileCardState>;
    transSize(size: string | number): string;
    renderValidateMessage(): ReactNode;
    renderPicValidateMsg(): ReactNode;
    renderPic(locale: Locale['Upload']): ReactNode;
    renderFile(locale: Locale["Upload"]): React.JSX.Element;
    onRemove(e: MouseEvent): void;
    onReplace(e: MouseEvent): void;
    onRetry(e: MouseEvent): void;
    render(): React.JSX.Element;
}
export default FileCard;
