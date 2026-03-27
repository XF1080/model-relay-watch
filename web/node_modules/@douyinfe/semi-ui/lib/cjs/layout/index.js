"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Layout = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/layout/constants");
require("@douyinfe/semi-foundation/lib/cjs/layout/layout.css");
var _layoutContext = _interopRequireDefault(require("./layout-context"));
var _Sider = _interopRequireDefault(require("./Sider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const htmlTag = {
  Header: 'header',
  Footer: 'footer',
  Content: 'main',
  Layout: 'section'
};
function generator(type) {
  const tagName = htmlTag[type];
  const typeName = type.toLowerCase();
  return BasicComponent => class Adapter extends _react.default.PureComponent {
    render() {
      return /*#__PURE__*/_react.default.createElement(BasicComponent, Object.assign({
        role: this.props.role,
        "aria-label": this.props['aria-label'],
        type: typeName,
        tagName: tagName
      }, this.props));
    }
  };
}
class Basic extends _react.default.PureComponent {
  render() {
    const _a = this.props,
      {
        prefixCls,
        type,
        className,
        children,
        tagName
      } = _a,
      others = __rest(_a, ["prefixCls", "type", "className", "children", "tagName"]);
    const classString = (0, _classnames.default)(className, `${prefixCls}-${type}`);
    return /*#__PURE__*/_react.default.createElement(tagName, Object.assign({
      className: classString
    }, others), children);
  }
}
Basic.propTypes = {
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
Basic.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX
};
const Header = generator('Header')(Basic);
const Footer = generator('Footer')(Basic);
const Content = generator('Content')(Basic);
class Layout extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      siders: []
    };
  }
  getSiderHook() {
    return {
      addSider: id => {
        this.setState(state => ({
          siders: [...state.siders, id]
        }));
      },
      removeSider: id => {
        this.setState(state => ({
          siders: state.siders.filter(curr => curr !== id)
        }));
      }
    };
  }
  render() {
    const _a = this.props,
      {
        prefixCls,
        className,
        children,
        hasSider,
        tagName
      } = _a,
      others = __rest(_a, ["prefixCls", "className", "children", "hasSider", "tagName"]);
    const {
      siders
    } = this.state;
    const classString = (0, _classnames.default)(className, prefixCls, {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' && hasSider || siders.length > 0 || _react.default.Children.toArray(children).some(child => {
        return /*#__PURE__*/_react.default.isValidElement(child) && child.type && child.type.elementType === "Layout.Sider";
      })
    });
    const Tag = tagName;
    return /*#__PURE__*/_react.default.createElement(_layoutContext.default.Provider, {
      value: {
        siderHook: this.getSiderHook()
      }
    }, /*#__PURE__*/_react.default.createElement(Tag, Object.assign({
      className: classString
    }, others), children));
  }
}
exports.Layout = Layout;
Layout.propTypes = {
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
Layout.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX,
  tagName: 'section'
};
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = _Sider.default;
var _default = exports.default = Layout;