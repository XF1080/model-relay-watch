"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TopSlotSvg = _ref => {
  let {
    gradientStart,
    gradientEnd
  } = _ref;
  const id = (0, _uuid.getUuidShort)();
  return /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "51",
    height: "52",
    viewBox: "0 0 51 52",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("g", {
    filter: "url(#filter0_d_6_2)"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M40.4918 46.5592C44.6795 43.176 46.261 34.1333 47.5301 25.6141C49.5854 11.8168 39.6662 1 25.8097 1C11.2857 1 3 11.4279 3 25.3518C3 33.7866 6.29361 43.8947 10.4602 46.5592C12.5868 47.9192 12.5868 47.9051 25.8097 47.9192C38.3651 47.9282 38.5352 48.14 40.4918 46.5592Z",
    fill: `url(#${id})`
  })), /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("filter", {
    id: "filter0_d_6_2",
    x: "0.789215",
    y: "0.447304",
    width: "49.2216",
    height: "51.3549",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/_react.default.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), /*#__PURE__*/_react.default.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/_react.default.createElement("feOffset", {
    dy: "1.65809"
  }), /*#__PURE__*/_react.default.createElement("feGaussianBlur", {
    stdDeviation: "1.10539"
  }), /*#__PURE__*/_react.default.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
  }), /*#__PURE__*/_react.default.createElement("feBlend", {
    mode: "normal",
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_6_2"
  }), /*#__PURE__*/_react.default.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "effect1_dropShadow_6_2",
    result: "shape"
  })), /*#__PURE__*/_react.default.createElement("linearGradient", {
    id: id,
    x1: "17.671",
    y1: "31.7392",
    x2: "17.671",
    y2: "47.9333",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/_react.default.createElement("stop", {
    stopColor: gradientStart
  }), /*#__PURE__*/_react.default.createElement("stop", {
    offset: "1",
    stopColor: gradientEnd
  }))));
};
var _default = exports.default = TopSlotSvg;