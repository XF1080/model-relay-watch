import React from 'react';
export type DescriptionsAlign = 'center' | 'justify' | 'left' | 'plain';
export type DescriptionLayout = 'horizontal' | 'vertical';
export interface DescriptionsContextValue {
    align?: DescriptionsAlign;
    layout?: DescriptionLayout;
}
declare const DescriptionsContext: React.Context<DescriptionsContextValue>;
export default DescriptionsContext;
