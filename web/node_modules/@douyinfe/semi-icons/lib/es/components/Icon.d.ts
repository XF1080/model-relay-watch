import React, { ReactNode, DetailedHTMLProps, ComponentType } from 'react';
import '../styles/icons.css';
export type IconSize = 'inherit' | 'extra-small' | 'small' | 'default' | 'large' | 'extra-large';
export interface IconProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    svg: ReactNode;
    size?: IconSize;
    spin?: boolean;
    rotate?: number;
    prefixCls?: string;
    type?: string;
    fill?: string[];
}
declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const convertIcon: (Svg: ComponentType, iconType: string) => React.ForwardRefExoticComponent<Omit<Omit<IconProps, "svg" | "type">, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { convertIcon };
export default Icon;
