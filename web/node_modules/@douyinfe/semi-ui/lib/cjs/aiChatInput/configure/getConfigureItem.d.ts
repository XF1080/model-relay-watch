import React from 'react';
interface ConfigureItemOpts {
    valueKey?: string;
    onKeyChangeFnName?: string;
    valuePath?: string;
    className?: string;
    defaultProps?: Record<string, any>;
}
declare function getConfigureItem(Component: any, opts?: ConfigureItemOpts): (props: any) => React.JSX.Element;
export default getConfigureItem;
