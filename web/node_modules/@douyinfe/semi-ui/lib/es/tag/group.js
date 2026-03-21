import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/tag/constants';
import Tag from './index';
import Popover from '../popover/index';
const prefixCls = cssClasses.PREFIX;
const tagSize = strings.TAG_SIZE;
const avatarShapeSet = strings.AVATAR_SHAPE;
export default class TagGroup extends PureComponent {
  renderNTag(n, restTags) {
    const {
      size,
      showPopover,
      popoverProps,
      onPlusNMouseEnter
    } = this.props;
    let nTag = /*#__PURE__*/React.createElement(Tag, {
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
      nTag = /*#__PURE__*/React.createElement(Popover, Object.assign({
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
      return /*#__PURE__*/React.createElement(Tag, Object.assign({}, newTag, {
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
    const groupCls = classNames({
      [`${prefixCls}-group`]: true,
      [`${prefixCls}-group-max`]: maxTagCount,
      [`${prefixCls}-group-small`]: size === 'small',
      [`${prefixCls}-group-large`]: size === 'large'
    }, className);
    const tags = this.renderAllTags();
    const tagContents = typeof maxTagCount === 'undefined' ? tags : this.renderMergeTags(tags);
    return /*#__PURE__*/React.createElement("div", {
      style: style,
      className: groupCls
    }, tagContents);
  }
}
TagGroup.defaultProps = {
  style: {},
  className: '',
  size: tagSize[0],
  avatarShape: 'square',
  onTagClose: () => undefined,
  onPlusNMouseEnter: () => undefined
};
TagGroup.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  maxTagCount: PropTypes.number,
  restCount: PropTypes.number,
  tagList: PropTypes.array,
  size: PropTypes.oneOf(tagSize),
  mode: PropTypes.string,
  onTagClose: PropTypes.func,
  showPopover: PropTypes.bool,
  popoverProps: PropTypes.object,
  avatarShape: PropTypes.oneOf(avatarShapeSet)
};