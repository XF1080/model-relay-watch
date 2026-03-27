type StrokeSet = {
    percent: number;
    color: string;
};
type StrokeArr = Array<StrokeSet>;
declare function generateColor(s: StrokeArr, percent: number, gradient: boolean): string | undefined;
export { generateColor, StrokeArr };
