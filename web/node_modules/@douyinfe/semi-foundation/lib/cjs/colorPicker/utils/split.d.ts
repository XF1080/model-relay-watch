declare const split: (str: string, mode: 'rgba' | 'hsva') => false | {
    r: number;
    g: number;
    b: number;
    a: number;
    h?: undefined;
    s?: undefined;
    v?: undefined;
} | {
    h: number;
    s: number;
    v: number;
    a: number;
    r?: undefined;
    g?: undefined;
    b?: undefined;
};
export default split;
