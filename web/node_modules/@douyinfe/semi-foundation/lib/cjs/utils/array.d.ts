/**
 * arrayA remove arrayB
 * @param {array} arrayA
 * @param {array} arrayB
 * @returns {array}  new array
 *
 * const arrayA = ['a', 'b', 'c', 'a', 'b', 'c'];
 *
 * const result = pullAll(arrayA, ['a', 'c'])
 * console.log(result);
 * => ['b', 'b']
 */
export declare function pullAll(arrayA: any[], arrayB: any[]): any[];
type CompareFn<T> = (a: T, b: T, sortOrder: 'ascend' | 'descend') => number;
/**
 * Adapt the descending order
 * @param {Function} fn
 * @param {String} order
 * @returns
 */
export declare function withOrderSort<T = any>(fn: CompareFn<T>, order?: 'ascend' | 'descend'): (a: T, b: T) => number;
export {};
