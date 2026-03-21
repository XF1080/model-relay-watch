"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/empty/constants");
require("@douyinfe/semi-foundation/lib/cjs/empty/empty.css");
var _typography = _interopRequireDefault(require("../typography"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
class Empty extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.observe = mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'theme-mode') {
          this.updateMode();
        }
      }
    };
    this.updateMode = () => {
      const val = this.body.getAttribute('theme-mode');
      if (val !== this.state.mode) {
        this.setState({
          mode: val
        });
      }
    };
    this.state = {
      mode: null
    };
  }
  componentDidMount() {
    if (this.props.darkModeImage) {
      this.body = window.document.body;
      this.updateMode();
      const config = {
        attributes: true,
        childList: false,
        subtree: false
      };
      this.observer = new MutationObserver(this.observe);
      this.observer.observe(this.body, config);
    }
  }
  componentWillUnmount() {
    this.observer && this.observer.disconnect();
  }
  render() {
    const _a = this.props,
      {
        className,
        image,
        description,
        style,
        title,
        imageStyle,
        children,
        layout,
        darkModeImage
      } = _a,
      rest = __rest(_a, ["className", "image", "description", "style", "title", "imageStyle", "children", "layout", "darkModeImage"]);
    const alt = typeof description === 'string' ? description : 'empty';
    const imgSrc = this.state.mode === 'dark' && darkModeImage ? darkModeImage : image;
    let imageNode = null;
    if (typeof imgSrc === 'string') {
      imageNode = /*#__PURE__*/_react.default.createElement("img", {
        alt: alt,
        src: imgSrc
      });
    } else if (imgSrc && 'id' in imgSrc) {
      imageNode = /*#__PURE__*/_react.default.createElement("svg", {
        "aria-hidden": "true"
      }, /*#__PURE__*/_react.default.createElement("use", {
        xlinkHref: `#${imgSrc.id}`
      }));
    } else {
      imageNode = imgSrc;
    }
    const wrapperCls = (0, _classnames.default)(className, prefixCls, {
      [`${prefixCls}-${layout}`]: layout
    });
    const titleProps = imageNode ? {
      heading: 4
    } : {
      heading: 6,
      style: {
        fontWeight: 400
      }
    };
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: wrapperCls,
      style: style
    }, this.getDataAttr(rest)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-image`,
      style: imageStyle,
      "x-semi-prop": "image,darkModeImage"
    }, imageNode), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`
    }, title ? (/*#__PURE__*/_react.default.createElement(_typography.default.Title, Object.assign({}, titleProps, {
      className: `${prefixCls}-title`,
      "x-semi-prop": "title"
    }), title)) : null, description ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-description`,
      "x-semi-prop": "description"
    }, description)) : null, children ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-footer`,
      "x-semi-prop": "children"
    }, children)) : null));
  }
}
exports.default = Empty;
Empty.defaultProps = {
  layout: 'vertical'
};