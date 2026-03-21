"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelShapeDefaults = exports.PanelShape = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PanelShape = exports.PanelShape = {
  panelHeader: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  panelFooter: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string])
};
const PanelShapeDefaults = exports.PanelShapeDefaults = {};