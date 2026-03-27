import { strings } from './constants';
type Rule = typeof strings.RULE[number];
type Truncate = typeof strings.TRUNCATE[number];
type Parser = (value: string) => string;
export default class FormatNumeral {
    private readonly content;
    private readonly rule;
    private readonly precision;
    private readonly truncate;
    private readonly parser;
    private readonly isDiyParser;
    private readonly ruleMethods;
    private readonly truncateMethods;
    constructor(content: string, rule: Rule, precision: number, truncate: Truncate, parser: Parser | undefined);
    format(): string;
    private truncatePrecision;
}
export {};
