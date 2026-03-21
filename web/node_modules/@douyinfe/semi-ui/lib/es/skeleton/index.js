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
import '@douyinfe/semi-foundation/lib/es/skeleton/skeleton.css';
import { Avatar, Image, Title, Button, Paragraph } from './item';
const prefixCls = cssClasses.PREFIX;
class Skeleton extends PureComponent {
  render() {
    const _a = this.props,
      {
        placeholder,
        active,
        children,
        className,
        loading,
        style
      } = _a,
      others = __rest(_a, ["placeholder", "active", "children", "className", "loading", "style"]);
    const skCls = cls(prefixCls, {
      [`${prefixCls}-active`]: Boolean(active)
    }, className);
    let content;
    if (loading) {
      content = /*#__PURE__*/React.createElement("div", Object.assign({
        className: skCls,
        style: style
      }, others, {
        "x-semi-prop": "placeholder"
      }), placeholder);
    } else {
      content = children;
    }
    return content;
  }
}
Skeleton.Avatar = Avatar;
Skeleton.Title = Title;
Skeleton.Button = Button;
Skeleton.Paragraph = Paragraph;
Skeleton.Image = Image;
Skeleton.defaultProps = {
  loading: true
};
Skeleton.propTypes = {
  active: PropTypes.bool,
  placeholder: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node
};
export default Skeleton;