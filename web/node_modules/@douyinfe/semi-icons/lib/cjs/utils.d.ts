interface GetUuidShortOptions {
    prefix?: string;
    length?: number;
}
/**
 * Get a random id with prefix, it not strictly guarantee id uniqueness
 *
 * Note: the return value of getUuid is too long, we need a short one
 *
 * @example
 * getUuidShort({ prefix: 'semi' }) => 'semi-46dinzc'
 * getUuidShort({ prefix: '' }) => '0eer2i0'
 * getUuidShort({ prefix: 'semi', length: 4 }) => 'semi-8jts'
 */
declare function getUuidShort(options?: GetUuidShortOptions): string;
declare function getFillColor(fill: string | string[] | undefined, num: number): any[];
export { getUuidShort, getFillColor };
