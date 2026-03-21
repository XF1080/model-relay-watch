import _isNumber from "lodash/isNumber";
import _isFunction from "lodash/isFunction";
import _get from "lodash/get";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent, Fragment } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import Avatar from './index';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/avatar/constants';
const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;
const overlapFromSet = strings.OVERLAP_FROM;
const prefixCls = cssClasses.PREFIX;
export default class AvatarGroup extends PureComponent {
  getAllAvatars() {
    const {
      children
    } = this.props;
    if (children) {
      return Array.isArray(children) ? React.Children.toArray(children) : [children];
    }
    return [];
  }
  getMergeAvatars(avatars) {
    const {
      maxCount
    } = this.props;
    let renderAvatars = avatars;
    const restNumber = avatars.length - maxCount;
    const normalAvatars = avatars.slice(0, maxCount);
    const restAvatars = avatars.slice(maxCount);
    if (restNumber > 0) {
      const more = this.renderMoreAvatar(restNumber, restAvatars);
      normalAvatars.push(more);
      renderAvatars = normalAvatars;
    }
    return renderAvatars;
  }
  renderMoreAvatar(restNumber, restAvatars) {
    const {
      renderMore
    } = this.props;
    const moreCls = cls(`${prefixCls}-item-more`);
    const restAvatarAlt = restAvatars === null || restAvatars === void 0 ? void 0 : restAvatars.reduce((pre, cur) => {
      const {
        children,
        alt
      } = cur.props;
      const avatarInfo = alt !== null && alt !== void 0 ? alt : typeof children === 'string' ? children : '';
      if (avatarInfo.length === 0) {
        return pre;
      }
      return pre.length > 0 ? `${pre},${avatarInfo}` : avatarInfo;
    }, '');
    const finalAlt = ` Number of remaining Avatars：${restNumber},${restAvatarAlt}`;
    let moreAvatar = /*#__PURE__*/React.createElement(Avatar, {
      className: moreCls,
      key: "_+n",
      alt: finalAlt
    }, `+${restNumber}`);
    if (_isFunction(renderMore)) {
      moreAvatar = /*#__PURE__*/React.createElement(Fragment, {
        key: "_+n"
      }, renderMore(restNumber, restAvatars));
    }
    return moreAvatar;
  }
  render() {
    const _a = this.props,
      {
        children,
        maxCount,
        overlapFrom,
        size,
        shape,
        renderMore
      } = _a,
      rest = __rest(_a, ["children", "maxCount", "overlapFrom", "size", "shape", "renderMore"]);
    let inner;
    const groupCls = cls({
      [`${prefixCls}-group`]: true
    });
    if (children) {
      const avatars = this.getAllAvatars();
      inner = (_isNumber(maxCount) ? this.getMergeAvatars(avatars) : avatars).map((itm, index) => {
        const className = cls(_get(itm.props, 'className'), {
          [`${prefixCls}-item-start-${index}`]: overlapFrom === 'start',
          [`${prefixCls}-item-end-${index}`]: overlapFrom === 'end'
        });
        return /*#__PURE__*/React.cloneElement(itm, Object.assign(Object.assign({}, rest), {
          className,
          size,
          shape,
          key: index
        }));
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      className: groupCls,
      role: 'list'
    }, inner);
  }
}
AvatarGroup.defaultProps = {
  size: 'medium',
  shape: 'circle',
  overlapFrom: 'start'
};
AvatarGroup.propTypes = {
  children: PropTypes.node,
  shape: PropTypes.oneOf(shapeSet),
  size: PropTypes.oneOf(sizeSet),
  maxCount: PropTypes.number,
  renderMore: PropTypes.func,
  overlapFrom: PropTypes.oneOf(overlapFromSet)
};