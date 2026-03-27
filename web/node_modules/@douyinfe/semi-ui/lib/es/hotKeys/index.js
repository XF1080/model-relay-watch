import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HotKeysFoudation from '@douyinfe/semi-foundation/lib/es/hotKeys/foundation';
import { cssClasses, Keys } from '@douyinfe/semi-foundation/lib/es/hotKeys/constants';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/hotKeys/hotKeys.css';
const prefixCls = cssClasses.PREFIX;
class HotKeys extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.foundation = new HotKeysFoudation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyHotKey: e => {
        var _a, _b;
        (_b = (_a = this.props).onHotKey) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      },
      registerEvent: () => {
        var _a, _b, _c;
        let target = (_c = (_b = (_a = this.props).getListenerTarget) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : document.body;
        target.addEventListener('keydown', this.foundation.handleKeyDown);
      },
      unregisterEvent: () => {
        var _a, _b, _c;
        let target = (_c = (_b = (_a = this.props).getListenerTarget) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : document.body;
        target.removeEventListener('keydown', this.foundation.handleKeyDown);
      }
    });
  }
  render() {
    const _a = this.props,
      {
        hotKeys,
        content,
        onClick,
        render,
        getListenerTarget,
        className,
        style
      } = _a,
      rest = __rest(_a, ["hotKeys", "content", "onClick", "render", "getListenerTarget", "className", "style"]);
    if (typeof render !== 'undefined') {
      if (render === null || typeof render === 'function' && render() === null) {
        return null;
      }
      return /*#__PURE__*/React.createElement("div", Object.assign({
        onClick: onClick,
        className: classNames(prefixCls, className),
        style: style
      }, this.getDataAttr(rest)), typeof render === 'function' ? render() : render);
    }
    const renderContent = content !== null && content !== void 0 ? content : hotKeys;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      onClick: onClick,
      className: classNames(prefixCls, className),
      style: style
    }, this.getDataAttr(rest)), renderContent.map((key, index) => {
      return index === 0 ? (/*#__PURE__*/React.createElement("span", {
        key: index
      }, /*#__PURE__*/React.createElement("span", {
        className: prefixCls + '-content'
      }, key))) : (/*#__PURE__*/React.createElement("span", {
        key: index
      }, /*#__PURE__*/React.createElement("span", {
        className: prefixCls + '-split'
      }, "+"), /*#__PURE__*/React.createElement("span", {
        className: prefixCls + '-content'
      }, key)));
    }));
  }
}
HotKeys.propTypes = {
  preventDefault: PropTypes.bool,
  hotKeys: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onHotKey: PropTypes.func,
  mergeMetaCtrl: PropTypes.bool,
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  getListenerTarget: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};
HotKeys.defaultProps = {
  preventDefault: false,
  hotKeys: null,
  content: null,
  onClick: _noop,
  onHotKey: _noop,
  mergeMetaCtrl: false,
  render: undefined,
  getListenerTarget: () => document.body,
  className: '',
  style: null
};
HotKeys.Keys = Keys;
export default HotKeys;