import React from 'react';
import { OptionProps } from './option';
import { OptionGroupProps } from './optionGroup';
declare const generateOption: (child: React.ReactElement<any>, parent: any, index: number, newKey?: string | number) => OptionProps;
declare const getOptionsFromGroup: (selectChildren: React.ReactNode) => {
    optionGroups: OptionGroupProps[];
    options: OptionProps[];
};
export { generateOption, getOptionsFromGroup };
