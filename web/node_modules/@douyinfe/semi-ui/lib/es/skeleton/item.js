var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/skeleton/constants';
import { strings } from '@douyinfe/semi-foundation/lib/es/avatar/constants';
import '@douyinfe/semi-foundation/lib/es/skeleton/skeleton.css';
const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;
const generator = type => BasicComponent => props => /*#__PURE__*/React.createElement(BasicComponent, Object.assign({
  type: type
}, props));
class Generic extends PureComponent {
  render() {
    const _a = this.props,
      {
        prefixCls,
        className,
        type,
        size,
        shape
      } = _a,
      others = __rest(_a, ["prefixCls", "className", "type", "size", "shape"]);
    const classString = cls(className, `${prefixCls}-${type}`, {
      [`${prefixCls}-${type}-${size}`]: type.toUpperCase() === 'AVATAR'
    }, {
      [`${prefixCls}-${type}-${shape}`]: type.toUpperCase() === 'AVATAR'
    });
    return /*#__PURE__*/React.createElement('div', Object.assign({
      className: classString
    }, others));
  }
}
Generic.propTypes = {
  type: PropTypes.string,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(sizeSet),
  shape: PropTypes.oneOf(shapeSet)
};
Generic.defaultProps = {
  prefixCls: cssClasses.PREFIX,
  size: 'medium',
  shape: 'circle'
};
export const Avatar = generator('avatar')(Generic);
export const Image = generator('image')(Generic);
export const Title = generator('title')(Generic);
export const Button = generator('button')(Generic);
export class Paragraph extends PureComponent {
  render() {
    const {
      prefixCls,
      className,
      style,
      rows
    } = this.props;
    const classString = cls(className, `${prefixCls}-paragraph`);
    return /*#__PURE__*/React.createElement("ul", {
      className: classString,
      style: style
    }, [...Array(rows)].map((e, i) => (/*#__PURE__*/React.createElement("li", {
      key: i
    }))));
  }
}
Paragraph.propTypes = {
  rows: PropTypes.number,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};
Paragraph.defaultProps = {
  prefixCls: cssClasses.PREFIX,
  rows: 4
};