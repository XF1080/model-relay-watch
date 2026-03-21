export function getFilterResult(inputValue) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let customFilter = arguments.length > 2 ? arguments[2] : undefined;
  const lowCaseInputValue = inputValue.toLowerCase();
  const filteredOptions = options.filter(option => {
    if (typeof customFilter === 'function') {
      return customFilter(lowCaseInputValue, option);
    } else {
      return baseFilter(lowCaseInputValue, option);
    }
  });
  return filteredOptions;
}
export function baseFilter(value, option) {
  const labelText = typeof option.label === 'string' ? option.label : '';
  if (labelText.toLowerCase().includes(value)) {
    return true;
  }
  const descText = typeof option.desc === 'string' ? option.desc : '';
  return descText.toLowerCase().includes(value);
}