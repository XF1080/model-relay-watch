"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _index = _interopRequireDefault(require("./index"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/avatar/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const sizeSet = _constants.strings.SIZE;
const shapeSet = _constants.strings.SHAPE;
const overlapFromSet = _constants.strings.OVERLAP_FROM;
const prefixCls = _constants.cssClasses.PREFIX;
class AvatarGroup extends _react.PureComponent {
  getAllAvatars() {
    const {
      children
    } = this.props;
    if (children) {
      return Array.isArray(children) ? _react.default.Children.toArray(children) : [children];
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
    const moreCls = (0, _classnames.default)(`${prefixCls}-item-more`);
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
    let moreAvatar = /*#__PURE__*/_react.default.createElement(_index.default, {
      className: moreCls,
      key: "_+n",
      alt: finalAlt
    }, `+${restNumber}`);
    if ((0, _isFunction2.default)(renderMore)) {
      moreAvatar = /*#__PURE__*/_react.default.createElement(_react.Fragment, {
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
    const groupCls = (0, _classnames.default)({
      [`${prefixCls}-group`]: true
    });
    if (children) {
      const avatars = this.getAllAvatars();
      inner = ((0, _isNumber2.default)(maxCount) ? this.getMergeAvatars(avatars) : avatars).map((itm, index) => {
        const className = (0, _classnames.default)((0, _get2.default)(itm.props, 'className'), {
          [`${prefixCls}-item-start-${index}`]: overlapFrom === 'start',
          [`${prefixCls}-item-end-${index}`]: overlapFrom === 'end'
        });
        return /*#__PURE__*/_react.default.cloneElement(itm, Object.assign(Object.assign({}, rest), {
          className,
          size,
          shape,
          key: index
        }));
      });
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: groupCls,
      role: 'list'
    }, inner);
  }
}
exports.default = AvatarGroup;
AvatarGroup.defaultProps = {
  size: 'medium',
  shape: 'circle',
  overlapFrom: 'start'
};
AvatarGroup.propTypes = {
  children: _propTypes.default.node,
  shape: _propTypes.default.oneOf(shapeSet),
  size: _propTypes.default.oneOf(sizeSet),
  maxCount: _propTypes.default.number,
  renderMore: _propTypes.default.func,
  overlapFrom: _propTypes.default.oneOf(overlapFromSet)
};