import React from 'react';
declare class Configure extends React.Component<any, any> {
    static contextType: React.Context<import("./context").ConfigureContextType>;
    static Button: (props: any) => React.JSX.Element;
    static Select: (props: any) => React.JSX.Element;
    static Mcp: React.MemoExoticComponent<(props: import("./mcp").McpProps) => React.JSX.Element>;
    static RadioButton: (props: any) => React.JSX.Element;
    constructor(props: any);
    _contextValue: any;
    onChange: (obj: any, init?: boolean) => void;
    onRemove: (field: string) => void;
    getConfigureValue: () => any;
    getContextValue: () => any;
    render(): React.JSX.Element;
}
export default Configure;
