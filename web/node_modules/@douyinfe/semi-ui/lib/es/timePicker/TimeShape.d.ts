import PropTypes from 'prop-types';
/**
 * Can be
 * - 12:00:12
 * - \[12:00:12]
 * - \[12:00:12, 12:21:12]
 * - \[[12:00:12, 12:21:12], [12:11:12, 12:32:12]]
 */
declare const TimeShape: PropTypes.Requireable<NonNullable<string | number | string[] | Date | number[] | Date[]>>;
export { TimeShape };
