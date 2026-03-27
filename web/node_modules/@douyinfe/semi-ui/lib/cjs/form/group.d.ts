import React, { Component } from 'react';
import { LabelProps } from './label';
import { InputGroupProps as BacisInputGroupProps } from '../input/inputGroup';
import { BaseFormProps } from './interface';
import { FormUpdaterContextType } from '@douyinfe/semi-foundation/lib/cjs/form/interface';
export interface InputGroupProps extends BacisInputGroupProps {
    label?: LabelProps;
    labelPosition?: 'left' | 'top';
    extraText?: React.ReactNode;
    extraTextPosition?: 'bottom' | 'middle';
}
declare class FormInputGroup extends Component<InputGroupProps> {
    static contextType: React.Context<FormUpdaterContextType>;
    context: FormUpdaterContextType;
    static defaultProps: {
        extraTextPosition: string;
    };
    renderLabel(label: LabelProps, formProps: BaseFormProps): React.JSX.Element;
    render(): React.JSX.Element;
}
export default FormInputGroup;
