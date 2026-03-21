import { Locale as dateFnsLocale } from 'date-fns';
/**
 * get left panel picker date and right panel picker date
 */
export default function getDefaultPickerDate(options: GetDefaultPickerValueDateOptions): {
    nowDate: Date;
    nextDate: Date;
};
type BaseValueType = string | number | Date;
interface GetDefaultPickerValueDateOptions {
    defaultPickerValue?: BaseValueType | BaseValueType[];
    format: string;
    dateFnsLocale: dateFnsLocale;
}
export {};
