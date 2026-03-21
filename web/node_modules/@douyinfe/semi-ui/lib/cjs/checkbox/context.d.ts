import React from 'react';
type CheckboxContextType = {
    checkboxGroup?: {
        onChange: (evt: any) => void;
        value: any[];
        disabled: boolean;
        name: any;
        isCardType: boolean;
        isPureCardType: boolean;
    };
};
declare const Context: React.Context<CheckboxContextType>;
export { Context, CheckboxContextType };
