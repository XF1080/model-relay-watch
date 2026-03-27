import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TagProps } from './interface';
import '@douyinfe/semi-foundation/lib/es/tag/tag.css';
export * from './interface';
export interface TagState {
    visible: boolean;
}
export default class Tag extends Component<TagProps, TagState> {
    static defaultProps: TagProps;
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        tagKey: PropTypes.Requireable<NonNullable<string | number>>;
        size: PropTypes.Requireable<string>;
        color: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<string>;
        closable: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        prefixIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        suffixIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        avatarSrc: PropTypes.Requireable<string>;
        colorful: PropTypes.Requireable<boolean>;
        gradient: PropTypes.Requireable<boolean>;
        avatarShape: PropTypes.Requireable<string>;
        'aria-label': PropTypes.Requireable<string>;
    };
    constructor(props: TagProps);
    static getDerivedStateFromProps(nextProps: TagProps): {
        visible: boolean;
    };
    setVisible(visible: boolean): void;
    close(e: React.MouseEvent<HTMLElement>, value: React.ReactNode, tagKey: string | number): void;
    handleKeyDown(event: any): void;
    renderAvatar(): React.JSX.Element;
    render(): React.JSX.Element;
}
