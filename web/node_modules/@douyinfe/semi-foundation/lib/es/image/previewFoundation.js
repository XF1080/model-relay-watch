import BaseFoundation from "../base/foundation";
export default class PreviewFoundation extends BaseFoundation {
  constructor() {
    super(...arguments);
    this.handleVisibleChange = newVisible => {
      const {
        visible,
        onVisibleChange
      } = this.getProps();
      if (!(visible in this.getProps())) {
        this.setState({
          visible: newVisible
        });
      }
      onVisibleChange && onVisibleChange(newVisible);
    };
    this.handleCurrentIndexChange = index => {
      const {
        currentIndex,
        onChange
      } = this.getProps();
      if (!(currentIndex in this.getProps())) {
        this.setState({
          currentIndex: index
        });
      }
      onChange && onChange(index);
    };
  }
}