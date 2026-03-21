import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AvatarGroupProps } from './interface';
export default class AvatarGroup extends PureComponent<AvatarGroupProps> {
    static defaultProps: {
        size: string;
        shape: string;
        overlapFrom: string;
    };
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        shape: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<string>;
        maxCount: PropTypes.Requireable<number>;
        renderMore: PropTypes.Requireable<(...args: any[]) => any>;
        overlapFrom: PropTypes.Requireable<string>;
    };
    getAllAvatars(): (string | number | true | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal)[];
    getMergeAvatars(avatars: React.ReactNode[]): React.ReactNode[];
    renderMoreAvatar(restNumber: number, restAvatars: React.ReactNode[]): React.JSX.Element;
    render(): React.JSX.Element;
}
