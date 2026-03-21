import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { strings } from '@douyinfe/semi-foundation/lib/cjs/datePicker/constants';
import { noop } from '@douyinfe/semi-foundation/lib/cjs/utils/function';
import { PresetsType, PresetType } from '@douyinfe/semi-foundation/lib/cjs/datePicker/foundation';
import { DateInputFoundationProps } from '@douyinfe/semi-foundation/lib/cjs/datePicker/inputFoundation';
export interface QuickControlProps {
    presets: PresetsType;
    presetPosition: typeof strings.PRESET_POSITION_SET[number];
    onPresetClick: (preset: PresetType, e: React.MouseEvent) => void;
    type: string;
    insetInput: DateInputFoundationProps['insetInput'];
    locale: any;
}
declare class QuickControl extends PureComponent<QuickControlProps> {
    static propTypes: {
        presets: PropTypes.Requireable<any[]>;
        presetPosition: PropTypes.Requireable<"left" | "top" | "right" | "bottom">;
        onPresetClick: PropTypes.Requireable<(...args: any[]) => any>;
        type: PropTypes.Requireable<string>;
        insetInput: PropTypes.Requireable<NonNullable<boolean | object>>;
        locale: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        presets: PresetsType;
        presetPosition: string;
        onPresetClick: typeof noop;
    };
    render(): React.JSX.Element;
}
export default QuickControl;
