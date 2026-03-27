import React from 'react';
import PropTypes from 'prop-types';
import MonthsGridFoundation, { MonthInfo, MonthsGridAdapter, MonthsGridDateAdapter, MonthsGridFoundationProps, MonthsGridFoundationState, MonthsGridRangeAdapter, PanelType } from '@douyinfe/semi-foundation/lib/es/datePicker/monthsGridFoundation';
import BaseComponent, { BaseProps } from '../_base/baseComponent';
import Combobox from '../timePicker/Combobox';
import YearAndMonth from './yearAndMonth';
import { ScrollItemProps } from '../scrollList/scrollItem';
export interface MonthsGridProps extends MonthsGridFoundationProps, BaseProps {
    navPrev?: React.ReactNode;
    navNext?: React.ReactNode;
    renderDate?: () => React.ReactNode;
    renderFullDate?: () => React.ReactNode;
    focusRecordsRef?: React.RefObject<{
        rangeStart: boolean;
        rangeEnd: boolean;
    }>;
    yearAndMonthOpts?: ScrollItemProps<any>;
}
export type MonthsGridState = MonthsGridFoundationState;
export default class MonthsGrid extends BaseComponent<MonthsGridProps, MonthsGridState> {
    static propTypes: {
        type: PropTypes.Requireable<"date" | "month" | "dateTime" | "dateRange" | "year" | "monthRange" | "dateTimeRange">;
        defaultValue: PropTypes.Requireable<any[]>;
        defaultPickerValue: PropTypes.Requireable<NonNullable<string | number | object>>;
        multiple: PropTypes.Requireable<boolean>;
        max: PropTypes.Requireable<number>;
        weekStartsOn: PropTypes.Requireable<number>;
        disabledDate: PropTypes.Requireable<(...args: any[]) => any>;
        disabledTime: PropTypes.Requireable<(...args: any[]) => any>;
        disabledTimePicker: PropTypes.Requireable<boolean>;
        hideDisabledOptions: PropTypes.Requireable<boolean>;
        navPrev: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        navNext: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        onMaxSelect: PropTypes.Requireable<(...args: any[]) => any>;
        timePickerOpts: PropTypes.Requireable<object>;
        isControlledComponent: PropTypes.Requireable<boolean>;
        rangeStart: PropTypes.Requireable<string>;
        rangeInputFocus: PropTypes.Requireable<NonNullable<string | boolean>>;
        locale: PropTypes.Requireable<object>;
        localeCode: PropTypes.Requireable<string>;
        format: PropTypes.Requireable<string>;
        renderDate: PropTypes.Requireable<(...args: any[]) => any>;
        renderFullDate: PropTypes.Requireable<(...args: any[]) => any>;
        startDateOffset: PropTypes.Requireable<(...args: any[]) => any>;
        endDateOffset: PropTypes.Requireable<(...args: any[]) => any>;
        autoSwitchDate: PropTypes.Requireable<boolean>;
        density: PropTypes.Requireable<string>;
        dateFnsLocale: PropTypes.Validator<object>;
        timeZone: PropTypes.Requireable<NonNullable<string | number>>;
        syncSwitchMonth: PropTypes.Requireable<boolean>;
        onPanelChange: PropTypes.Requireable<(...args: any[]) => any>;
        focusRecordsRef: PropTypes.Requireable<object>;
        triggerRender: PropTypes.Requireable<(...args: any[]) => any>;
        presetPosition: PropTypes.Requireable<"left" | "top" | "right" | "bottom">;
        renderQuickControls: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        renderDateInput: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        type: string;
        rangeStart: string;
        multiple: boolean;
        weekStartsOn: 0;
        disabledDate: {
            (): false;
            (): false;
        };
        onMaxSelect: (...args: any[]) => void;
        locale: {};
    };
    foundation: MonthsGridFoundation;
    constructor(props: MonthsGridProps);
    get dateAdapter(): MonthsGridDateAdapter;
    get rangeAdapter(): MonthsGridRangeAdapter;
    get adapter(): MonthsGridAdapter;
    componentDidMount(): void;
    componentDidUpdate(prevProps: MonthsGridProps, prevState: MonthsGridState): void;
    cacheRefCurrent: (key: string, current: Combobox | YearAndMonth | HTMLDivElement) => void;
    leftIsYearOrTime: (state?: MonthsGridState) => boolean;
    rightIsYearOrTime: (state?: MonthsGridState) => boolean;
    /**
     * Calculate the height of the scrolling list, if the animation is not over, return 0
     */
    calcScrollListHeight: () => number;
    renderPanel(month: Date, panelType: PanelType): React.JSX.Element;
    showYearPicker(panelType: PanelType, e: React.MouseEvent): void;
    renderMonth(month: Date, panelType: PanelType): React.JSX.Element;
    handleWeeksRowNumChange: (weeksRowNum: number, panelType: PanelType) => void;
    reselect: () => void;
    getYAMOpenType: () => "both" | "none" | "left" | "right";
    renderTimePicker(panelType: PanelType, panelDetail: MonthInfo): React.JSX.Element;
    renderYearAndMonth(panelType: PanelType, panelDetail: MonthInfo): React.JSX.Element;
    renderSwitch(panelType: PanelType): React.JSX.Element;
    render(): React.JSX.Element;
}
