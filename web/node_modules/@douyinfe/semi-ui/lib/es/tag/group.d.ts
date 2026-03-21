import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tag from './index';
import { TagGroupProps } from './interface';
export default class TagGroup<T> extends PureComponent<TagGroupProps<T>> {
    static defaultProps: {
        style: {};
        className: string;
        size: string;
        avatarShape: string;
        onTagClose: () => any;
        onPlusNMouseEnter: () => any;
    };
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        maxTagCount: PropTypes.Requireable<number>;
        restCount: PropTypes.Requireable<number>;
        tagList: PropTypes.Requireable<any[]>;
        size: PropTypes.Requireable<string>;
        mode: PropTypes.Requireable<string>;
        onTagClose: PropTypes.Requireable<(...args: any[]) => any>;
        showPopover: PropTypes.Requireable<boolean>;
        popoverProps: PropTypes.Requireable<object>;
        avatarShape: PropTypes.Requireable<string>;
    };
    renderNTag(n: number, restTags: React.ReactNode): React.JSX.Element;
    renderMergeTags(tags: (Tag | React.ReactNode)[]): (React.ReactNode | Tag)[];
    renderAllTags(): (React.ReactNode | Tag)[];
    render(): React.JSX.Element;
}
