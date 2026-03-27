import AsyncValidator from 'async-validator';
import { FieldValidateTriggerType, BasicTriggerType, ComponentProps, WithFieldOption } from './interface';
/**
 *
 * @param WrappedComponent React.ComponentType | any
 */
export declare function getDisplayName(WrappedComponent: any): string;
export declare function generateValidatesFromRules(field: string, rules?: any[]): AsyncValidator;
export declare function isRequired(rules?: any[] | Record<string, any>): boolean;
export declare function isValid(errors: any): boolean;
/**
 * trigger transform rule
    1. If the user has set fieldProps, follow the user's fieldProps
    2. If the user does not set fieldProps, follow formProps
    3. If there is no formProps, follow the change
    4. If it is an array, follow the array, if it is not an array (pure string), convert it to a string array
 */
export declare function transformTrigger(fieldTrigger: FieldValidateTriggerType, formTrigger: FieldValidateTriggerType): Array<BasicTriggerType>;
export declare function transformDefaultBooleanAPI(fieldProp: boolean, formProp: boolean, defaultVal?: boolean): boolean;
export declare function mergeOptions(opts: WithFieldOption, props: ComponentProps): {
    options: {
        valueKey: string;
        onKeyChangeFnName: string;
        valuePath: string;
        maintainCursor: boolean;
        shouldMemo: boolean;
        shouldInject: boolean;
    };
    shouldInject: boolean;
};
export declare function mergeProps(props: any): {
    field: any;
    label: any;
    labelPosition: any;
    labelWidth: any;
    labelAlign: any;
    labelCol: any;
    wrapperCol: any;
    noLabel: any;
    noErrorMessage: any;
    isInInputGroup: any;
    initValue: any;
    validate: any;
    validateStatus: any;
    trigger: any;
    allowEmptyString: any;
    allowEmpty: any;
    emptyValue: any;
    rules: any;
    required: boolean;
    keepState: any;
    transform: any;
    name: any;
    fieldClassName: any;
    fieldStyle: any;
    convert: any;
    stopValidateWithError: any;
    showValidateIcon: any;
    helpText: any;
    extraText: any;
    extraTextPosition: any;
    pure: any;
    rest: any;
    id: any;
};
