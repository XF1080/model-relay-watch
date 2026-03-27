import Checkbox, { CheckboxProps, CheckboxEvent } from './checkbox';
import Group, { CheckboxGroupProps, CheckboxType, CheckboxDirection } from './checkboxGroup';
export type { CheckboxInnerProps } from './checkboxInner';
declare class CheckboxWithGroup extends Checkbox {
    static Group: typeof Group;
}
export { CheckboxWithGroup, Checkbox, };
export type { CheckboxProps, CheckboxGroupProps, CheckboxEvent, CheckboxType, CheckboxDirection };
export default CheckboxWithGroup;
