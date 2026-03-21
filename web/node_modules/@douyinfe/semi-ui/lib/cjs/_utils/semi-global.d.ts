import type { AutoCompleteProps } from "../autoComplete";
import type { AvatarProps } from "../avatar";
import type { CascaderProps } from "../cascader";
import type { CollapseReactProps } from "../collapse";
import type { CollapsibleProps } from "../collapsible";
import type { DatePickerProps } from "../datePicker";
import type { DropdownProps } from "../dropdown";
import type { ModalReactProps } from "../modal";
import type { NavProps } from "../navigation";
import type { NoticeReactProps } from "../notification";
import type { OverflowListProps } from "../overflowList";
import type { PopconfirmProps } from "../popconfirm";
import type { PopoverProps } from "../popover";
import type { SelectProps } from "../select";
import type { SideSheetReactProps } from "../sideSheet";
import type { TabsProps } from "../tabs";
import type { TimePickerProps } from "../timePicker";
import type { ToastReactProps } from "../toast";
import type { TooltipProps } from "../tooltip";
import type { MarkdownRenderProps } from "../markdownRender";
import { SpinProps } from "../spin";
interface SemiGlobalConfig {
    /**
     * Inject `createRoot` from `react-dom/client` for React 19 compatibility.
     * See https://semi.design/zh-CN/ecosystem/react19
     */
    createRoot?: (container: Element | DocumentFragment) => {
        render(children: any): void;
        unmount(): void;
    };
    overrideDefaultProps?: {
        "AutoComplete"?: Partial<AutoCompleteProps<any>>;
        "Avatar"?: Partial<AvatarProps>;
        "MarkdownRender"?: Partial<MarkdownRenderProps>;
        Cascader?: Partial<CascaderProps>;
        Collapse?: Partial<CollapseReactProps>;
        Collapsible?: Partial<CollapsibleProps>;
        DatePicker?: Partial<DatePickerProps>;
        Dropdown?: Partial<DropdownProps>;
        Modal?: Partial<ModalReactProps>;
        Navigation?: Partial<NavProps>;
        Notification?: Partial<NoticeReactProps>;
        OverflowList?: Partial<OverflowListProps>;
        Popconfirm?: Partial<PopconfirmProps>;
        Popover?: Partial<PopoverProps>;
        Select?: Partial<SelectProps>;
        SideSheet?: Partial<SideSheetReactProps>;
        Spin?: Partial<SpinProps>;
        Tabs?: Partial<TabsProps>;
        TimePicker?: Partial<TimePickerProps>;
        Toast?: Partial<ToastReactProps>;
        Tooltip?: Partial<TooltipProps>;
    };
}
declare class SemiGlobal {
    config: SemiGlobalConfig;
}
declare const _default: SemiGlobal;
export default _default;
