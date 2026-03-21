import React from 'react';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/cjs/cropper/cropper.css';
import CropperFoundation, { CropperAdapter, ImageDataState, CropperBox } from '@douyinfe/semi-foundation/lib/cjs/cropper/foundation';
interface CropperProps {
    className?: string;
    style?: React.CSSProperties;
    src?: string;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    shape?: 'rect' | 'round' | 'roundRect';
    aspectRatio?: number;
    defaultAspectRatio?: number;
    zoom?: number;
    onZoomChange?: (zoom: number) => void;
    rotate?: number;
    showResizeBox?: boolean;
    cropperBoxStyle?: React.CSSProperties;
    cropperBoxCls?: string;
    fill?: string;
    maxZoom?: number;
    minZoom?: number;
    zoomStep?: number;
    preview?: () => HTMLElement;
}
interface CropperState {
    imgData: ImageDataState;
    cropperBox: CropperBox;
    zoom: number;
    rotate: number;
    loaded: boolean;
}
declare class Cropper extends BaseComponent<CropperProps, CropperState> {
    static __SemiComponentName__: string;
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        shape: string;
        defaultAspectRatio: number;
        showResizeBox: boolean;
        fill: string;
        maxZoom: number;
        minZoom: number;
        zoomStep: number;
    };
    containerRef: HTMLDivElement;
    imgRef: React.RefObject<HTMLImageElement>;
    foundation: CropperFoundation;
    constructor(props: CropperProps);
    get adapter(): CropperAdapter<CropperProps, CropperState>;
    static getDerivedStateFromProps(nextProps: CropperProps, prevState: CropperState): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    unRegisterImageWrapRef: () => void;
    registryImageWrapRef: (ref: any) => void;
    getCropperCanvas: () => HTMLCanvasElement;
    render(): React.JSX.Element;
}
export default Cropper;
