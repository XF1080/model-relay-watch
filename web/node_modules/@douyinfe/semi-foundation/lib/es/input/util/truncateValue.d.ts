export default function truncateValue(options: {
    value: string;
    maxLength: number;
    getValueLength?: (value: string) => number;
}): string;
