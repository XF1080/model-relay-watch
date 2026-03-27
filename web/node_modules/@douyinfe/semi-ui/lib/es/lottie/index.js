import _isEqual from "lodash/isEqual";
import * as React from 'react';
import LottieFoundation from '@douyinfe/semi-foundation/lib/es/lottie/foundation';
import BaseComponent from '../_base/baseComponent';
import cls from "classnames";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/lottie/constants';
import PropTypes from "prop-types";
import { getDefaultPropsFromGlobalConfig } from "../_utils";
class Lottie extends BaseComponent {
  constructor(props) {
    super(props);
    this.container = /*#__PURE__*/React.createRef();
    this.foundation = new LottieFoundation(this.adapter);
  }
  get adapter() {
    const getContainer = () => {
      var _a;
      return (_a = this.props.params.container) !== null && _a !== void 0 ? _a : this.container.current;
    };
    return Object.assign(Object.assign({}, super.adapter), {
      getContainer,
      getLoadParams: () => {
        return Object.assign({
          container: getContainer(),
          renderer: "svg",
          loop: true,
          autoplay: true
        }, this.props.params);
      }
    });
  }
  componentDidMount() {
    var _a, _b;
    super.componentDidMount();
    (_b = (_a = this.props).getAnimationInstance) === null || _b === void 0 ? void 0 : _b.call(_a, this.foundation.animation);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_isEqual(prevProps.params, this.props.params)) {
      this.foundation.handleParamsUpdate();
    }
  }
  get wrapperStyle() {
    return Object.assign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
  }
  get wrapperClassName() {
    return cls(cssClasses.PREFIX, this.props.className);
  }
  render() {
    if (this.props.params.container) {
      return null;
    } else {
      return /*#__PURE__*/React.createElement("div", Object.assign({
        ref: this.container,
        style: this.wrapperStyle,
        className: this.wrapperClassName
      }, this.getDataAttr(this.props)));
    }
  }
}
Lottie.__SemiComponentName__ = "Lottie";
Lottie.getLottie = LottieFoundation.getLottie;
Lottie.defaultProps = getDefaultPropsFromGlobalConfig(Lottie.__SemiComponentName__);
Lottie.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  params: PropTypes.object,
  getAnimationInstance: PropTypes.func
};
export default Lottie;