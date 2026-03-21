"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/typography/constants");
var _base = _interopRequireDefault(require("./base"));
var _formatNumeral = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/typography/formatNumeral"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class Numeral extends _react.PureComponent {
  // Traverse the entire virtual DOM using a depth-first traversal algorithm, then format each piece. (in react)
  formatNodeDFS(node) {
    if (!Array.isArray(node)) {
      node = [node];
    }
    // Because the property is read-only, an object is returned for overwriting rather than directly modifying the object's contents.
    node = node.map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        // Formatting the digital content of nodes.
        return new _formatNumeral.default(String(item), this.props.rule, this.props.precision, this.props.truncate, this.props.parser).format();
      }
      if (typeof item === 'function') {
        return this.formatNodeDFS(item());
      }
      if (typeof item === 'object' && 'children' in item['props']) {
        return Object.assign(Object.assign({}, item), {
          props: Object.assign(Object.assign({}, item['props']), {
            children: this.formatNodeDFS(item['props']['children'])
          })
        });
      }
      return item;
    });
    return node.length === 1 ? node[0] : node;
  }
  render() {
    // Deep copy and remove props that are not needed by the Base component.
    const baseProps = Object.assign({}, this.props);
    delete baseProps.rule;
    delete baseProps.parser;
    // Each piece of content in the virtual DOM is formatted by the `formatNumeral` function.
    baseProps.children = this.formatNodeDFS(this.props.children);
    return /*#__PURE__*/_react.default.createElement(_base.default, Object.assign({
      component: 'span'
    }, baseProps));
  }
}
exports.default = Numeral;
Numeral.propTypes = {
  rule: _propTypes.default.oneOf(_constants.strings.RULE),
  precision: _propTypes.default.number,
  truncate: _propTypes.default.oneOf(_constants.strings.TRUNCATE),
  parser: _propTypes.default.func,
  copyable: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  delete: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  mark: _propTypes.default.bool,
  underline: _propTypes.default.bool,
  link: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  strong: _propTypes.default.bool,
  type: _propTypes.default.oneOf(_constants.strings.TYPE),
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  code: _propTypes.default.bool,
  component: _propTypes.default.string
};
Numeral.defaultProps = {
  rule: 'text',
  precision: 0,
  truncate: 'round',
  parser: undefined,
  copyable: false,
  delete: false,
  icon: '',
  mark: false,
  underline: false,
  strong: false,
  link: false,
  type: 'primary',
  style: {},
  size: 'normal',
  className: ''
};