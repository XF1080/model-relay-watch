import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/es/steps/steps.css';
import { FillStepsProps } from './fillSteps';
import { BasicStepsProps } from './basicSteps';
import { NavStepsProps } from './navSteps';
export type { Status, Size, BasicStepProps } from './basicStep';
export type { Direction, BasicStepsProps } from './basicSteps';
export type { FillStepProps } from './fillStep';
export type { FillStepsProps } from './fillSteps';
export type { NavStepProps } from './navStep';
export type { NavStepsProps } from './navSteps';
export type { StepProps } from './step';
export interface FillStepsAllProps extends FillStepsProps {
    type?: 'fill';
}
export interface BasicStepsAllProps extends BasicStepsProps {
    type?: 'basic';
}
export interface NavStepsAllProps extends NavStepsProps {
    type?: 'nav';
}
export type StepsProps = FillStepsAllProps | BasicStepsAllProps | NavStepsAllProps;
declare class Steps extends Component<StepsProps> {
    static Step: (props: import("./step").StepProps) => React.JSX.Element;
    static propTypes: {
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        type: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        type: string;
        size: string;
    };
    renderComponent(): React.JSX.Element;
    render(): React.JSX.Element;
}
export default Steps;
