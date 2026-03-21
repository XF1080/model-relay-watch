"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoItem = VideoItem;
exports.default = Item;
var _react = _interopRequireWildcard(require("react"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _utils = require("../../videoPlayer/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.ANNOTATION_ITEM;
function VideoItem(props) {
  const {
    title,
    url,
    logo,
    img,
    duration,
    order,
    onClick,
    siteName
  } = props;
  const onItemClick = (0, _react.useCallback)(e => {
    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    const {
        onClick
      } = props,
      rest = __rest(props, ["onClick"]);
    onClick === null || onClick === void 0 ? void 0 : onClick(e, rest);
  }, [url, props]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    _react.default.createElement("div", {
      className: `${prefixCls} ${prefixCls}-video`,
      onClick: onItemClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-video-img-wrapper`
    }, img && /*#__PURE__*/_react.default.createElement("img", {
      className: `${prefixCls}-video-img`,
      src: img,
      alt: title
    }), /*#__PURE__*/_react.default.createElement(_semiIcons.IconPlay, {
      className: `${prefixCls}-video-play`
    }), typeof duration === 'number' && (/*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-video-duration`
    }, (0, _utils.formatTime)(duration)))), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-video-content`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-title`
    }, title), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-footer`
    }, /*#__PURE__*/_react.default.createElement("img", {
      className: `${prefixCls}-footer-logo`,
      src: logo,
      alt: title
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-footer-text`
    }, siteName), typeof order === 'number' && /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-footer-order`
    }, order))))
  );
}
function Item(props) {
  const {
    title,
    url,
    detail,
    logo,
    order,
    siteName
  } = props;
  const onItemClick = (0, _react.useCallback)(e => {
    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    const {
        onClick
      } = props,
      rest = __rest(props, ["onClick"]);
    onClick === null || onClick === void 0 ? void 0 : onClick(e, rest);
  }, [url, props]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    _react.default.createElement("div", {
      className: `${prefixCls} ${prefixCls}-text`,
      onClick: onItemClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-title`
    }, title), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-text-detail`
    }, detail), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-footer`
    }, logo && /*#__PURE__*/_react.default.createElement("img", {
      className: `${prefixCls}-footer-logo`,
      src: logo,
      alt: title
    }), siteName && /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-footer-text`
    }, siteName), typeof order === 'number' && /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-footer-order`
    }, order)))
  );
}