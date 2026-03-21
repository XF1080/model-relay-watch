"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogueStepWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _collapsible = _interopRequireDefault(require("../../../collapsible"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatDialogue/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX_STEP;
const {
  PREFIX_CONTENT
} = _constants.cssClasses;
const DialogueStepWidget = props => {
  const [openIndexes, setOpenIndexes] = (0, _react.useState)(() => new Set(props.steps.map((_, i) => i)));
  (0, _react.useEffect)(() => {
    setOpenIndexes(new Set(props.steps.map((_, i) => i)));
  }, [props.steps]);
  const toggleOpen = (0, _react.useCallback)(idx => {
    setOpenIndexes(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);
  const completedIcon = () => {
    return /*#__PURE__*/_react.default.createElement(_semiIcons.IconStoryStroked, {
      className: `${prefixCls}-completed`
    });
  };
  const loadingIcon = () => {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: `${PREFIX_CONTENT}-loading`
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: `${PREFIX_CONTENT}-loading-item`
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: `${PREFIX_CONTENT}-loading-item`
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: `${PREFIX_CONTENT}-loading-item`
    }));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-wrapper`
  }, props.steps.map((item, index) => {
    const {
      summary,
      status,
      actions
    } = item;
    const isOpen = openIndexes.has(index);
    const actionsLength = actions === null || actions === void 0 ? void 0 : actions.length;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: index
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}`,
      role: "button",
      tabIndex: 0,
      onClick: () => toggleOpen(index),
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen(index);
        }
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-prefix`
    }, status === 'completed' ? completedIcon() : loadingIcon()), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-summary`
    }, summary), actionsLength > 0 && (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-suffix`
    }, isOpen ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronUp, null) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronDown, null)))), /*#__PURE__*/_react.default.createElement(_collapsible.default, {
      isOpen: isOpen
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-panel`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-line`
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-action-wrapper`
    }, actions === null || actions === void 0 ? void 0 : actions.map((action, i) => (/*#__PURE__*/_react.default.createElement("div", {
      key: i,
      className: `${prefixCls}-action`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-action-summary`
    }, action.summary), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-action-desc`
    }, action.icon, action.description))))))));
  }));
};
exports.DialogueStepWidget = DialogueStepWidget;