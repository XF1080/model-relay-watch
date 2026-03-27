import React from 'react';
interface ConfigureContextType {
    value: any;
    onChange: (value: any, init?: boolean) => void;
    onRemove: (field: string) => void;
}
declare const Context: React.Context<ConfigureContextType>;
export { Context, ConfigureContextType };
