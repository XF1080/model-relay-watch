"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("./Button"));
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Button extends _react.default.PureComponent {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
  }
  render() {
    const props = Object.assign({}, this.props);
    const hasIcon = Boolean(props.icon);
    const isLoading = Boolean(props.loading);
    const isDisabled = Boolean(props.disabled);
    if (hasIcon || isLoading && !isDisabled) {
      return /*#__PURE__*/_react.default.createElement(_iconButton.default, Object.assign({}, props));
    } else {
      return /*#__PURE__*/_react.default.createElement(_Button.default, Object.assign({}, props));
    }
  }
}
Button.__SemiComponentName__ = "Button";
Button.propTypes = Object.assign(Object.assign({}, _Button.default.propTypes), _iconButton.default.propTypes);
Button.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Button.__SemiComponentName__);
Button.elementType = 'Button';
var _default = exports.default = Button;