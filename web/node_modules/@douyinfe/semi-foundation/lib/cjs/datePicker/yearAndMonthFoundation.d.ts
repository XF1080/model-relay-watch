import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { PresetPosition } from './foundation';
import { ArrayElement } from '../utils/type';
import { strings } from './constants';
import { PanelType } from './monthsGridFoundation';
type Type = ArrayElement<typeof strings.TYPE_SET>;
export interface YearAndMonthFoundationProps {
    currentYear: {
        left: number;
        right: number;
    };
    currentMonth: {
        left: number;
        right: number;
    };
    onSelect?: (obj: {
        currentMonth: {
            left: number;
            right: number;
        };
        currentYear: {
            left: number;
            right: number;
        };
    }) => void;
    onBackToMain?: () => void;
    locale?: any;
    localeCode?: string;
    monthCycled?: boolean;
    yearCycled?: boolean;
    noBackBtn?: boolean;
    disabledDate?: (date: Date) => boolean;
    density?: string;
    presetPosition?: PresetPosition;
    renderQuickControls?: any;
    renderDateInput?: any;
    type?: Type;
    yearAndMonthOpts?: any;
    startYear?: number;
    endYear?: number;
}
export interface YearAndMonthFoundationState {
    years: Array<{
        value: number;
        year: number;
    }>;
    months: Array<{
        value: number;
        month: number;
    }>;
    currentYear: {
        left: number;
        right: number;
    };
    currentMonth: {
        left: number;
        right: number;
    };
}
export interface YearAndMonthAdapter extends DefaultAdapter<YearAndMonthFoundationProps, YearAndMonthFoundationState> {
    setCurrentYear: (currentYear: {
        left: number;
        right: number;
    }, cb?: () => void) => void;
    setCurrentMonth: (currentMonth: {
        left: number;
        right: number;
    }) => void;
    setCurrentYearAndMonth: (currentYear: {
        left: number;
        right: number;
    }, currentMonth: {
        left: number;
        right: number;
    }) => void;
    notifySelectYear: (year: {
        left: number;
        right: number;
    }) => void;
    notifySelectMonth: (month: {
        left: number;
        right: number;
    }) => void;
    notifySelectYearAndMonth: (year: {
        left: number;
        right: number;
    }, month: {
        left: number;
        right: number;
    }) => void;
    notifyBackToMain: () => void;
}
export interface MonthScrollItem {
    [k: string]: any;
    month: number;
    value: string;
    disabled: boolean;
}
export interface YearScrollItem {
    [k: string]: any;
    year: number;
    value: number;
    disabled: boolean;
}
export default class YearAndMonthFoundation extends BaseFoundation<YearAndMonthAdapter> {
    constructor(adapter: YearAndMonthAdapter);
    init(): void;
    destroy(): void;
    selectYear(item: YearScrollItem, panelType?: PanelType): void;
    selectMonth(item: MonthScrollItem, panelType?: PanelType): void;
    /**
     * After selecting a year, if the currentMonth is disabled, automatically select a non-disabled month
     */
    autoSelectMonth(item: YearScrollItem, panelType: PanelType, year: {
        left: number;
        right: number;
    }): void;
    backToMain(): void;
}
export {};
