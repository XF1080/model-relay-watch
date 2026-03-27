"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/markdownRender/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/markdownRender/markdownRender.css");
var runtime = _interopRequireWildcard(require("react/jsx-runtime"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/markdownRender/constants");
var SemiMarkdownComponents = _interopRequireWildcard(require("./components"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class MarkdownRender extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.foundation = new _foundation.default(this.adapter);
    this.state = {
      MDXContentComponent: "div"
    };
  }
  componentDidMount() {
    (() => __awaiter(this, void 0, void 0, function* () {
      this.setState({
        MDXContentComponent: yield this.foundation.evaluate(this.props.raw)
      });
    }))();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.raw !== this.props.raw) {
      (() => __awaiter(this, void 0, void 0, function* () {
        this.setState({
          MDXContentComponent: yield this.foundation.evaluate(this.props.raw)
        });
      }))();
    }
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getRuntime: () => runtime
    });
  }
  render() {
    const ComponentConstructor = this.state.MDXContentComponent;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: (0, _classnames.default)(_constants.cssClasses.PREFIX, this.props.className),
      style: this.props.style
    }, this.getDataAttr()), /*#__PURE__*/React.createElement(ComponentConstructor, {
      components: Object.assign(Object.assign({}, SemiMarkdownComponents), this.props.components)
    }));
  }
}
MarkdownRender.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  format: _propTypes.default.string,
  components: _propTypes.default.any,
  raw: _propTypes.default.string,
  remarkPlugins: _propTypes.default.arrayOf(_propTypes.default.any),
  rehypePlugins: _propTypes.default.arrayOf(_propTypes.default.any),
  remarkGfm: _propTypes.default.bool
};
MarkdownRender.__SemiComponentName__ = "MarkdownRender";
MarkdownRender.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(MarkdownRender.__SemiComponentName__, {
  format: "mdx",
  remarkGfm: true
});
MarkdownRender.defaultComponents = SemiMarkdownComponents;
var _default = exports.default = MarkdownRender;