import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { ContextValue } from '../configProvider/context';
import { ConfigProps, NotificationListAdapter, NotificationListProps, NotificationListState } from '@douyinfe/semi-foundation/lib/es/notification/notificationListFoundation';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/notification/notification.css';
import useNotification from './useNotification';
import { NoticeInstance, NoticePosition, NoticeProps, NoticeState } from '@douyinfe/semi-foundation/lib/es/notification/notificationFoundation';
export interface NoticeReactProps extends NoticeProps {
    style?: CSSProperties;
}
export type { NoticeState, NotificationListProps, NotificationListState, ConfigProps };
export type NoticesInPosition = {
    top: NoticeInstance[];
    topLeft: NoticeInstance[];
    topRight: NoticeInstance[];
    bottom: NoticeInstance[];
    bottomLeft: NoticeInstance[];
    bottomRight: NoticeInstance[];
};
declare class NotificationList extends BaseComponent<NotificationListProps, NotificationListState> {
    static contextType: React.Context<ContextValue>;
    static propTypes: {
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        direction: PropTypes.Requireable<"ltr" | "rtl">;
    };
    static defaultProps: {};
    static useNotification: typeof useNotification;
    private static wrapperId;
    private noticeStorage;
    private removeItemStorage;
    constructor(props: NotificationListProps);
    context: ContextValue;
    get adapter(): NotificationListAdapter;
    static addNotice(notice: NoticeProps): string;
    static removeNotice(id: string): string;
    static info(opts: NoticeProps): string;
    static success(opts: NoticeProps): string;
    static error(opts: NoticeProps): string;
    static warning(opts: NoticeProps): string;
    static open(opts: NoticeProps): string;
    static close(id: string): string;
    static destroyAll(): void;
    static config(opts: ConfigProps): void;
    add: (noticeOpts: NoticeProps) => any;
    has: (id: string) => any;
    remove: (id: string) => void;
    update: (id: string, opts: NoticeProps) => any;
    destroyAll: () => any;
    renderNoticeInPosition: (notices: NoticeInstance[], position: NoticePosition, removedItems?: NoticeInstance[], updatedItems?: NoticeInstance[]) => React.JSX.Element;
    setPosInStyle(noticeInstance: NoticeInstance): {};
    render(): React.JSX.Element;
}
export default NotificationList;
