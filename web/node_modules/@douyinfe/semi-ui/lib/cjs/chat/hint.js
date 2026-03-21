"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _semiIcons = require("@douyinfe/semi-icons");
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/chat/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PREFIX_HINT
} = _constants.cssClasses;
const Hint = /*#__PURE__*/_react.default.memo(props => {
  const {
    value,
    onHintClick,
    renderHintBox,
    className,
    style
  } = props;
  return /*#__PURE__*/_react.default.createElement("section", {
    className: (0, _classnames.default)(`${PREFIX_HINT}s`, {
      [className]: !!className
    }),
    style: style
  }, value.map((item, index) => {
    if (renderHintBox) {
      return renderHintBox({
        content: item,
        index: index,
        onHintClick: () => {
          onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
        }
      });
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${PREFIX_HINT}-item`,
      key: index,
      onClick: () => {
        onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${PREFIX_HINT}-content`
    }, item), /*#__PURE__*/_react.default.createElement(_semiIcons.IconArrowRight, {
      className: `${PREFIX_HINT}-icon`
    }));
  }));
});
var _default = exports.default = Hint;