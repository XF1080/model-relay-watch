/**
 *
 * @param {number|number[]|string|string[]} from
 * @param {number|number[]|string|string[]} to
 * @param {number} ratio
 * @param {Function} [parser]
 * @param {Function} [formatter]
 * @returns {any}
*/
export type FromTo = string | number | (string | number)[];
export type Parser = (value: FromTo) => any;
export type Formatter = (value: any[]) => any;
export default function interpolate(from: FromTo, to: FromTo, ratio?: number, parser?: Parser, formatter?: Formatter): any;
