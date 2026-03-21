"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useFormApi = _interopRequireDefault(require("./useFormApi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const buildFieldApi = (formApi, field) => ({
  getError: () => formApi.getError(field),
  setError: error => formApi.setError(field, error),
  getTouched: () => formApi.getTouched(field),
  setTouched: isTouched => formApi.setTouched(field, isTouched),
  getValue: () => formApi.getValue(field),
  setValue: value => formApi.setValue(field, value)
});
function useFieldApi(field) {
  const formApi = (0, _useFormApi.default)();
  const fieldApi = buildFieldApi(formApi, field);
  return fieldApi;
}
var _default = exports.default = useFieldApi;