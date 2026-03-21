import React from 'react';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import type { ContentProps } from './content';
import { ContainerReactProps } from '../interface';
interface AnnotationProps extends ContainerReactProps, ContentProps {
}
interface AnnotationState {
}
declare class Annotation extends BaseComponent<AnnotationProps, AnnotationState> {
    static propTypes: {
        info: PropTypes.Requireable<any[]>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        activeKey: PropTypes.Requireable<NonNullable<string | any[]>>;
        renderItem: PropTypes.Requireable<(...args: any[]) => any>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        visible: PropTypes.Requireable<boolean>;
        motion: PropTypes.Requireable<boolean>;
        minWidth: PropTypes.Requireable<NonNullable<string | number>>;
        maxWidth: PropTypes.Requireable<NonNullable<string | number>>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        afterVisibleChange: PropTypes.Requireable<(...args: any[]) => any>;
        resizable: PropTypes.Requireable<boolean>;
        defaultSize: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        showClose: PropTypes.Requireable<boolean>;
    };
    static AnnotationContent: React.MemoExoticComponent<(props: ContentProps) => React.JSX.Element>;
    static __SemiComponentName__: string;
    static defaultProps: {};
    render(): React.JSX.Element;
}
export default Annotation;
