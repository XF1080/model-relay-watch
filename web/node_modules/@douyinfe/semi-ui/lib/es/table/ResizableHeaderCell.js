var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import { Resizable } from 'react-resizable';
class ResizableHeaderCell extends React.PureComponent {
  render() {
    const _a = this.props,
      {
        onResize,
        onResizeStart,
        onResizeStop,
        width,
        resize
      } = _a,
      restProps = __rest(_a, ["onResize", "onResizeStart", "onResizeStop", "width", "resize"]);
    if (typeof width !== 'number' || resize === false) {
      return /*#__PURE__*/React.createElement("th", Object.assign({}, restProps));
    }
    let {
      children
    } = restProps;
    // Fragment must be used here, otherwise there will be an error (seemingly a react-resizable@1.9.0 problem)
    children = React.Children.map(children, (child, index) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, child));
    return /*#__PURE__*/React.createElement(Resizable, {
      width: width,
      height: 0,
      onResize: onResize,
      onResizeStart: onResizeStart,
      onResizeStop: onResizeStop,
      draggableOpts: {
        enableUserSelectHack: false
      },
      axis: 'x'
    }, /*#__PURE__*/React.createElement("th", Object.assign({}, restProps), children));
  }
}
export default ResizableHeaderCell;