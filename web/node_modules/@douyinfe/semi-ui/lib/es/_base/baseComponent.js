/**
 * The Semi Foundation / Adapter architecture split was inspired by Material Component For Web. （https://github.com/material-components/material-components-web）
 * We re-implemented our own code based on the principle and added more functions we need according to actual needs.
 */
import { Component } from 'react';
import log from '@douyinfe/semi-foundation/lib/es/utils/log';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
const {
  hasOwnProperty
} = Object.prototype;
// eslint-disable-next-line
export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.isControlled = key => Boolean(key && this.props && typeof this.props === 'object' && hasOwnProperty.call(this.props, key));
    this.setStateAsync = state => {
      return new Promise(resolve => {
        this.setState(state, resolve);
      });
    };
    this.cache = {};
    this.foundation = null;
  }
  componentDidMount() {
    this.foundation && typeof this.foundation.init === 'function' && this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation && typeof this.foundation.destroy === 'function' && this.foundation.destroy();
    this.cache = {};
  }
  get adapter() {
    return {
      getContext: key => {
        if (this.context && key) {
          return this.context[key];
        }
      },
      getContexts: () => this.context,
      getProp: key => this.props[key],
      // return all props
      getProps: () => this.props,
      getState: key => this.state[key],
      getStates: () => this.state,
      setState: (states, cb) => this.setState(Object.assign({}, states), cb),
      getCache: key => key && this.cache[key],
      getCaches: () => this.cache,
      setCache: (key, value) => key && (this.cache[key] = value),
      stopPropagation: e => {
        try {
          e.stopPropagation();
          e.nativeEvent && e.nativeEvent.stopImmediatePropagation();
        } catch (error) {}
      },
      persistEvent: e => {
        e && e.persist && typeof e.persist === 'function' ? e.persist() : null;
      }
    };
  }
  log(text) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    return log(text, ...rest);
  }
  getDataAttr() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    return getDataAttr(props);
  }
}
BaseComponent.propTypes = {};
BaseComponent.defaultProps = {};