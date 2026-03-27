import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import type { BasicFieldError } from '@douyinfe/semi-foundation/lib/es/form/interface';
export type ReactFieldError = BasicFieldError | React.ReactNode;
export interface ErrorMessageProps {
    error?: ReactFieldError;
    className?: string;
    style?: React.CSSProperties;
    showValidateIcon?: boolean;
    validateStatus?: string;
    helpText?: React.ReactNode;
    isInInputGroup?: boolean;
    errorMessageId?: string;
    helpTextId?: string;
}
export default class ErrorMessage extends PureComponent<ErrorMessageProps> {
    static propTypes: {
        error: PropTypes.Requireable<NonNullable<any[] | PropTypes.ReactNodeLike>>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        validateStatus: PropTypes.Requireable<string>;
        showValidateIcon: PropTypes.Requireable<boolean>;
        helpText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        isInInputGroup: PropTypes.Requireable<boolean>;
        errorMessageId: PropTypes.Requireable<string>;
        helpTextId: PropTypes.Requireable<string>;
    };
    generatorText(error: ReactFieldError): React.JSX.Element;
    render(): React.JSX.Element;
}
