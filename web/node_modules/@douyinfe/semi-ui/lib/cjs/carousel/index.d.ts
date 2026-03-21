import React, { ReactNode, ReactChild, ReactFragment, ReactPortal } from 'react';
import PropTypes from 'prop-types';
import BaseComponent from "../_base/baseComponent";
import { CarouselProps } from './interface';
import CarouselFoundation, { CarouselAdapter } from '@douyinfe/semi-foundation/lib/cjs/carousel/foundation';
import '@douyinfe/semi-foundation/lib/cjs/carousel/carousel.css';
export interface CarouselState {
    activeIndex: number;
    preIndex: number;
    isReverse: boolean;
    isInit: boolean;
}
declare class Carousel extends BaseComponent<CarouselProps, CarouselState> {
    static propTypes: {
        activeIndex: PropTypes.Requireable<number>;
        animation: PropTypes.Requireable<"fade" | "slide">;
        arrowProps: PropTypes.Requireable<object>;
        autoPlay: PropTypes.Requireable<NonNullable<boolean | object>>;
        className: PropTypes.Requireable<string>;
        defaultActiveIndex: PropTypes.Requireable<number>;
        indicatorPosition: PropTypes.Requireable<"center" | "left" | "right">;
        indicatorSize: PropTypes.Requireable<"small" | "medium">;
        indicatorType: PropTypes.Requireable<"line" | "dot" | "columnar">;
        theme: PropTypes.Requireable<"dark" | "light" | "primary">;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        arrowType: PropTypes.Requireable<"hover" | "always">;
        showArrow: PropTypes.Requireable<boolean>;
        showIndicator: PropTypes.Requireable<boolean>;
        slideDirection: PropTypes.Requireable<"left" | "right">;
        speed: PropTypes.Requireable<number>;
        style: PropTypes.Requireable<object>;
        trigger: PropTypes.Requireable<"hover" | "click">;
    };
    static defaultProps: CarouselProps;
    foundation: CarouselFoundation;
    constructor(props: CarouselProps);
    get adapter(): CarouselAdapter<CarouselProps, CarouselState>;
    static getDerivedStateFromProps(props: CarouselProps, state: CarouselState): Partial<CarouselState>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    play: () => void;
    stop: () => void;
    goTo: (targetIndex: number) => void;
    prev: () => void;
    next: () => void;
    handleAutoPlay: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    onIndicatorChange: (activeIndex: number) => void;
    getChildren: () => (ReactChild | ReactFragment | ReactPortal)[];
    getValidIndex: (activeIndex: number) => number;
    renderChildren: () => React.JSX.Element;
    renderIndicator: () => React.JSX.Element;
    renderArrow: () => React.JSX.Element;
    render(): ReactNode;
}
export default Carousel;
