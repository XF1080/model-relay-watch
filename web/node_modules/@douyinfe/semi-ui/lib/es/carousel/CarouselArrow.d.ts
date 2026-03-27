import React, { ReactNode } from "react";
import { CarouselArrowProps } from "./interface";
declare class CarouselArrow extends React.PureComponent<CarouselArrowProps> {
    renderLeftIcon: () => React.ReactNode | React.JSX.Element;
    renderRightIcon: () => React.ReactNode | React.JSX.Element;
    render(): ReactNode;
}
export default CarouselArrow;
