"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatDialogue/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PREFIX_HINT
} = _constants.cssClasses;
const Hint = /*#__PURE__*/_react.default.memo(props => {
  const {
    hints,
    onHintClick,
    renderHintBox,
    className,
    style,
    selecting
  } = props;
  return /*#__PURE__*/_react.default.createElement("section", {
    className: (0, _classnames.default)(`${PREFIX_HINT}s`, {
      [className]: !!className,
      [`${PREFIX_HINT}s-selecting`]: selecting
    }),
    style: style
  }, hints.map((item, index) => {
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
      role: "button",
      tabIndex: 0,
      className: `${PREFIX_HINT}-item`,
      key: index,
      onClick: () => {
        onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
      },
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
        }
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${PREFIX_HINT}-content`
    }, item));
  }));
});
var _default = exports.default = Hint;