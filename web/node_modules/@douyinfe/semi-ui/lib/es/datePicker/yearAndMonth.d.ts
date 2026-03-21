import React from 'react';
import PropTypes from 'prop-types';
import YearAndMonthFoundation, { MonthScrollItem, YearAndMonthAdapter, YearAndMonthFoundationProps, YearAndMonthFoundationState, YearScrollItem } from '@douyinfe/semi-foundation/lib/es/datePicker/yearAndMonthFoundation';
import BaseComponent, { BaseProps } from '../_base/baseComponent';
import ScrollItem from '../scrollList/scrollItem';
import { Locale } from '../locale/interface';
import { PanelType } from '@douyinfe/semi-foundation/lib/es/datePicker/monthsGridFoundation';
export interface YearAndMonthProps extends YearAndMonthFoundationProps, BaseProps {
    locale?: Locale['DatePicker'];
}
export type YearAndMonthState = YearAndMonthFoundationState;
declare class YearAndMonth extends BaseComponent<YearAndMonthProps, YearAndMonthState> {
    static propTypes: {
        currentYear: PropTypes.Requireable<object>;
        currentMonth: PropTypes.Requireable<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        locale: PropTypes.Requireable<object>;
        localeCode: PropTypes.Requireable<string>;
        monthCycled: PropTypes.Requireable<boolean>;
        yearCycled: PropTypes.Requireable<boolean>;
        noBackBtn: PropTypes.Requireable<boolean>;
        disabledDate: PropTypes.Requireable<(...args: any[]) => any>;
        density: PropTypes.Requireable<string>;
        presetPosition: PropTypes.Requireable<"left" | "top" | "right" | "bottom">;
        renderQuickControls: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        renderDateInput: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        type: PropTypes.Requireable<"date" | "month" | "dateTime" | "dateRange" | "year" | "monthRange" | "dateTimeRange">;
        startYear: PropTypes.Requireable<number>;
        endYear: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        disabledDate: {
            (): false;
            (): false;
        };
        monthCycled: boolean;
        yearCycled: boolean;
        noBackBtn: boolean;
        onSelect: (...args: any[]) => void;
        type: string;
    };
    foundation: YearAndMonthFoundation;
    yearRef: React.RefObject<ScrollItem<YearScrollItem>>;
    monthRef: React.RefObject<ScrollItem<MonthScrollItem>>;
    constructor(props: YearAndMonthProps);
    get adapter(): YearAndMonthAdapter;
    static getDerivedStateFromProps(props: YearAndMonthProps, state: YearAndMonthState): Partial<YearAndMonthFoundationState>;
    renderColYear(panelType: PanelType): React.JSX.Element;
    selectYear: (item: YearScrollItem, panelType?: PanelType) => void;
    selectMonth: (item: MonthScrollItem, panelType?: PanelType) => void;
    reselect: () => void;
    renderColMonth(panelType: PanelType): React.JSX.Element;
    backToMain: React.MouseEventHandler<HTMLButtonElement>;
    renderPanel(panelType: PanelType): React.JSX.Element;
    render(): React.JSX.Element;
}
export default YearAndMonth;
