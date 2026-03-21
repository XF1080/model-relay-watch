import React from 'react';
export interface IconProps {
    id?: number;
    component?: React.ReactNode;
    size?: number;
    className?: string;
    type?: string;
    customIconCls?: string;
}
declare function Icon(props?: IconProps): React.JSX.Element;
export default Icon;
