declare const cssClasses: {
    PREFIX: string;
};
declare const strings: {
    readonly WEIGHT: readonly ["light", "regular", "medium", "semibold", "bold", "default"];
    readonly TYPE: readonly ["primary", "secondary", "danger", "warning", "success", "tertiary", "quaternary"];
    readonly SIZE: readonly ["normal", "small", "inherit"];
    readonly SPACING: readonly ["normal", "extended"];
    readonly HEADING: readonly [1, 2, 3, 4, 5, 6];
    readonly RULE: readonly ["text", "numbers", "bytes-decimal", "bytes-binary", "percentages", "exponential"];
    readonly TRUNCATE: readonly ["ceil", "floor", "round"];
};
export { cssClasses, strings };
