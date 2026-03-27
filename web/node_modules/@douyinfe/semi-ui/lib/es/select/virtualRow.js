const VirtualRow = _ref => {
  let {
    index,
    data,
    style
  } = _ref;
  const {
    visibleOptions,
    renderOption
  } = data;
  const option = visibleOptions[index];
  return renderOption(option, index, style);
};
export default VirtualRow;