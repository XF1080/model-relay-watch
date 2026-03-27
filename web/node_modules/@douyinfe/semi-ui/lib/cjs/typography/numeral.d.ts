import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TypographyBaseSize, TypographyBaseType, TypographyBaseRule, OmitTypographyProps, TypographyBaseTruncate } from './interface';
import { CopyableConfig, LinkType } from './title';
type OmitNumeralProps = OmitTypographyProps;
export interface NumeralProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, OmitNumeralProps> {
    rule?: TypographyBaseRule;
    precision?: number;
    truncate?: TypographyBaseTruncate;
    parser?: (value: string) => string;
    children?: React.ReactNode;
    className?: string;
    code?: boolean;
    component?: React.ElementType;
    copyable?: CopyableConfig | boolean;
    delete?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode | string;
    link?: LinkType;
    mark?: boolean;
    size?: TypographyBaseSize;
    strong?: boolean;
    style?: React.CSSProperties;
    type?: TypographyBaseType;
    underline?: boolean;
}
export default class Numeral extends PureComponent<NumeralProps> {
    static propTypes: {
        rule: PropTypes.Requireable<"text" | "numbers" | "bytes-decimal" | "bytes-binary" | "percentages" | "exponential">;
        precision: PropTypes.Requireable<number>;
        truncate: PropTypes.Requireable<"round" | "ceil" | "floor">;
        parser: PropTypes.Requireable<(...args: any[]) => any>;
        copyable: PropTypes.Requireable<NonNullable<boolean | object>>;
        delete: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        mark: PropTypes.Requireable<boolean>;
        underline: PropTypes.Requireable<boolean>;
        link: PropTypes.Requireable<NonNullable<boolean | object>>;
        strong: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<"warning" | "success" | "primary" | "secondary" | "danger" | "tertiary" | "quaternary">;
        size: PropTypes.Requireable<"small" | "normal" | "inherit">;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        code: PropTypes.Requireable<boolean>;
        component: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        rule: string;
        precision: number;
        truncate: string;
        parser: any;
        copyable: boolean;
        delete: boolean;
        icon: string;
        mark: boolean;
        underline: boolean;
        strong: boolean;
        link: boolean;
        type: string;
        style: {};
        size: string;
        className: string;
    };
    formatNodeDFS(node: any): any;
    render(): React.JSX.Element;
}
export {};
