import BaseFoundation from '../base/foundation';
class SpinFoundation extends BaseFoundation {
  static get spinDefaultAdapter() {
    return {
      getProp: () => undefined,
      setLoading: val => undefined
    };
  }
  constructor(adapter) {
    super(Object.assign(Object.assign({}, SpinFoundation.spinDefaultAdapter), adapter));
  }
  updateLoadingIfNeedDelay() {
    const {
      spinning: propsSpinning,
      delay: propsDelay
    } = this._adapter.getProps();
    const {
      delay
    } = this._adapter.getStates();
    if (delay) {
      const self = this;
      this._timer = setTimeout(() => {
        self._adapter.setState({
          loading: propsSpinning,
          delay: 0
        });
      }, propsDelay);
    }
  }
  destroy() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
}
export default SpinFoundation;