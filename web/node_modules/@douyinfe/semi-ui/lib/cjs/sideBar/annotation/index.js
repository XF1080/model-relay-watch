"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _container = _interopRequireDefault(require("../container"));
var _content = _interopRequireDefault(require("./content"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.ANNOTATION;
class Annotation extends _baseComponent.default {
  render() {
    const containerProps = (0, _pick2.default)(this.props, ['title', 'style', 'visible', 'motion', 'minWidth', 'maxWidth', 'onCancel', 'afterVisibleChange', 'resizable', 'defaultSize', 'children', 'className']);
    const contentProps = (0, _pick2.default)(this.props, ['activeKey', 'info', 'onChange', 'onClick', 'renderItem']);
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Sidebar"
    }, locale => {
      var _a;
      return /*#__PURE__*/_react.default.createElement(_container.default, Object.assign({}, containerProps, {
        className: (0, _classnames.default)(prefixCls, {
          [containerProps.className]: containerProps.className
        }),
        title: (_a = containerProps.title) !== null && _a !== void 0 ? _a : locale.annotationTitle
      }), /*#__PURE__*/_react.default.createElement(_content.default, Object.assign({}, contentProps)));
    });
  }
}
Annotation.propTypes = Object.assign(Object.assign({}, _container.default.propTypes), {
  info: _propTypes.default.array,
  onChange: _propTypes.default.func,
  onClick: _propTypes.default.func,
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  renderItem: _propTypes.default.func
});
Annotation.AnnotationContent = _content.default;
Annotation.__SemiComponentName__ = "Sidebar.Annotation";
Annotation.defaultProps = {};
var _default = exports.default = Annotation;