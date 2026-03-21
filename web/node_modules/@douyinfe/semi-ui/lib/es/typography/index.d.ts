import BaseTypography from './typography';
import Text from './text';
import Title from './title';
import Paragraph from './paragraph';
import Numeral from './numeral';
export type TypographyType = typeof BaseTypography & {
    Text: typeof Text;
    Title: typeof Title;
    Paragraph: typeof Paragraph;
    Numeral: typeof Numeral;
};
declare const Typography: TypographyType;
export type { BaseTypographyProps } from './base';
export type { CopyableProps } from './copyable';
export type { TitleProps } from './title';
export type { TextProps } from './text';
export type { ParagraphProps } from './paragraph';
export * from './interface';
export default Typography;
