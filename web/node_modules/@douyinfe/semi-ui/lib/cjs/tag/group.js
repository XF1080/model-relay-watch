"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/tag/constants");
var _index = _interopRequireDefault(require("./index"));
var _index2 = _interopRequireDefault(require("../popover/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
const tagSize = _constants.strings.TAG_SIZE;
const avatarShapeSet = _constants.strings.AVATAR_SHAPE;
class TagGroup extends _react.PureComponent {
  renderNTag(n, restTags) {
    const {
      size,
      showPopover,
      popoverProps,
      onPlusNMouseEnter
    } = this.props;
    let nTag = /*#__PURE__*/_react.default.createElement(_index.default, {
      closable: false,
      size: size,
      color: "grey",
      style: {
        backgroundColor: 'transparent'
      },
      key: "_+n",
      onMouseEnter: onPlusNMouseEnter
    }, "+", n);
    if (showPopover) {
      nTag = /*#__PURE__*/_react.default.createElement(_index2.default, Object.assign({
        showArrow: true,
        content: restTags,
        trigger: "hover",
        position: "top",
        autoAdjustOverflow: true,
        className: `${prefixCls}-rest-group-popover`
      }, popoverProps, {
        key: "_+n_Popover"
      }), nTag);
    }
    return nTag;
  }
  renderMergeTags(tags) {
    const {
      maxTagCount,
      tagList,
      restCount
    } = this.props;
    const n = restCount ? restCount : tagList.length - maxTagCount;
    let renderTags = tags;
    const normalTags = tags.slice(0, maxTagCount);
    const restTags = tags.slice(maxTagCount);
    let nTag = null;
    if (n > 0) {
      nTag = this.renderNTag(n, restTags);
      normalTags.push(nTag);
      renderTags = normalTags;
    }
    return renderTags;
  }
  renderAllTags() {
    const {
      tagList,
      size,
      mode,
      avatarShape,
      onTagClose
    } = this.props;
    const renderTags = tagList.map(tag => {
      if (mode === 'custom') {
        return tag;
      }
      const newTag = Object.assign({}, tag);
      if (!newTag.size) {
        newTag.size = size;
      }
      if (!newTag.avatarShape) {
        newTag.avatarShape = avatarShape;
      }
      if (!newTag.tagKey) {
        if (typeof newTag.children === 'string' || typeof newTag.children === 'number') {
          newTag.tagKey = newTag.children;
        } else {
          newTag.tagKey = Math.random();
        }
      }
      return /*#__PURE__*/_react.default.createElement(_index.default, Object.assign({}, newTag, {
        key: newTag.tagKey,
        onClose: (tagChildren, e, tagKey) => {
          if (newTag.onClose) {
            newTag.onClose(tagChildren, e, tagKey);
          }
          onTagClose && onTagClose(tagChildren, e, tagKey);
        }
      }));
    });
    return renderTags;
  }
  render() {
    const {
      style,
      className,
      maxTagCount,
      size
    } = this.props;
    const groupCls = (0, _classnames.default)({
      [`${prefixCls}-group`]: true,
      [`${prefixCls}-group-max`]: maxTagCount,
      [`${prefixCls}-group-small`]: size === 'small',
      [`${prefixCls}-group-large`]: size === 'large'
    }, className);
    const tags = this.renderAllTags();
    const tagContents = typeof maxTagCount === 'undefined' ? tags : this.renderMergeTags(tags);
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style,
      className: groupCls
    }, tagContents);
  }
}
exports.default = TagGroup;
TagGroup.defaultProps = {
  style: {},
  className: '',
  size: tagSize[0],
  avatarShape: 'square',
  onTagClose: () => undefined,
  onPlusNMouseEnter: () => undefined
};
TagGroup.propTypes = {
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  maxTagCount: _propTypes.default.number,
  restCount: _propTypes.default.number,
  tagList: _propTypes.default.array,
  size: _propTypes.default.oneOf(tagSize),
  mode: _propTypes.default.string,
  onTagClose: _propTypes.default.func,
  showPopover: _propTypes.default.bool,
  popoverProps: _propTypes.default.object,
  avatarShape: _propTypes.default.oneOf(avatarShapeSet)
};