import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import lottie, { AnimationItem } from "lottie-web";
import { ArgsType } from "../collapse/foundation";
export interface LottieAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getContainer: () => Element;
    getLoadParams: () => ArgsType<typeof lottie.loadAnimation>[0];
}
export interface LottieBaseProps {
    width?: string;
    height?: string;
    params: Partial<ArgsType<typeof lottie.loadAnimation>[0]>;
    getAnimationInstance?: (instance: AnimationItem | null) => void;
    getLottie?: (lottiePKG: typeof lottie) => void;
}
export interface LottieBaseState {
}
declare class LottieFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<LottieAdapter<P, S>, P, S> {
    animation: null | AnimationItem;
    constructor(adapter: LottieAdapter<P, S>);
    static getLottie: () => import("lottie-web").LottiePlayer;
    init(lifecycle?: any): void;
    handleParamsUpdate: () => void;
    destroy(): void;
}
export default LottieFoundation;
