import React from 'react';
import PropTypes from 'prop-types';
import CalendarFoundation, { CalendarAdapter, EventObject, ParsedEvents, ParsedRangeEvent, WeeklyData } from '@douyinfe/semi-foundation/lib/es/calendar/foundation';
import BaseComponent from '../_base/baseComponent';
import type { WeekCalendarProps } from './interface';
import '@douyinfe/semi-foundation/lib/es/calendar/calendar.css';
import { Locale } from '../locale/interface';
export interface WeekCalendarState {
    scrollHeight: number;
    parsedEvents: ParsedEvents;
    cachedKeys: Array<string>;
}
export default class WeekCalendar extends BaseComponent<WeekCalendarProps, WeekCalendarState> {
    static propTypes: {
        displayValue: PropTypes.Requireable<Date>;
        header: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        events: PropTypes.Requireable<any[]>;
        mode: PropTypes.Requireable<string>;
        showCurrTime: PropTypes.Requireable<boolean>;
        markWeekend: PropTypes.Requireable<boolean>;
        scrollTop: PropTypes.Requireable<number>;
        renderTimeDisplay: PropTypes.Requireable<(...args: any[]) => any>;
        renderDateDisplay: PropTypes.Requireable<(...args: any[]) => any>;
        dateGridRender: PropTypes.Requireable<(...args: any[]) => any>;
        allDayEventsRender: PropTypes.Requireable<(...args: any[]) => any>;
        width: PropTypes.Requireable<NonNullable<string | number>>;
        height: PropTypes.Requireable<NonNullable<string | number>>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        displayValue: Date;
        events: EventObject[];
        mode: string;
    };
    static contextType: React.Context<Locale>;
    dom: React.RefObject<HTMLDivElement>;
    scrollDom: React.RefObject<HTMLDivElement>;
    allDayRowHeight: number;
    weeklyData: WeeklyData;
    foundation: CalendarFoundation;
    constructor(props: WeekCalendarProps);
    get adapter(): CalendarAdapter<WeekCalendarProps, WeekCalendarState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: WeekCalendarProps, prevState: WeekCalendarState): void;
    componentWillUnmount(): void;
    checkWeekend: (val: Date) => boolean;
    handleClick: (e: React.MouseEvent, val: [Date, number, number, number]) => void;
    renderDayGrid: () => React.JSX.Element[];
    renderHeader: (dateFnsLocale: any) => React.JSX.Element;
    renderAllDayEvents: (events: ParsedRangeEvent[]) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.JSX.Element[];
    renderAllDay: (locale: Locale['Calendar']) => React.JSX.Element;
    render(): React.JSX.Element;
}
