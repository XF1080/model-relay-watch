var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useCallback } from 'react';
import { IconPlay } from '@douyinfe/semi-icons';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import { formatTime } from '../../videoPlayer/utils';
const prefixCls = cssClasses.ANNOTATION_ITEM;
export function VideoItem(props) {
  const {
    title,
    url,
    logo,
    img,
    duration,
    order,
    onClick,
    siteName
  } = props;
  const onItemClick = useCallback(e => {
    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    const {
        onClick
      } = props,
      rest = __rest(props, ["onClick"]);
    onClick === null || onClick === void 0 ? void 0 : onClick(e, rest);
  }, [url, props]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      className: `${prefixCls} ${prefixCls}-video`,
      onClick: onItemClick
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-video-img-wrapper`
    }, img && /*#__PURE__*/React.createElement("img", {
      className: `${prefixCls}-video-img`,
      src: img,
      alt: title
    }), /*#__PURE__*/React.createElement(IconPlay, {
      className: `${prefixCls}-video-play`
    }), typeof duration === 'number' && (/*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-video-duration`
    }, formatTime(duration)))), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-video-content`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-title`
    }, title), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-footer`
    }, /*#__PURE__*/React.createElement("img", {
      className: `${prefixCls}-footer-logo`,
      src: logo,
      alt: title
    }), /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-footer-text`
    }, siteName), typeof order === 'number' && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-footer-order`
    }, order))))
  );
}
export default function Item(props) {
  const {
    title,
    url,
    detail,
    logo,
    order,
    siteName
  } = props;
  const onItemClick = useCallback(e => {
    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    const {
        onClick
      } = props,
      rest = __rest(props, ["onClick"]);
    onClick === null || onClick === void 0 ? void 0 : onClick(e, rest);
  }, [url, props]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      className: `${prefixCls} ${prefixCls}-text`,
      onClick: onItemClick
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-title`
    }, title), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-text-detail`
    }, detail), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-footer`
    }, logo && /*#__PURE__*/React.createElement("img", {
      className: `${prefixCls}-footer-logo`,
      src: logo,
      alt: title
    }), siteName && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-footer-text`
    }, siteName), typeof order === 'number' && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-footer-order`
    }, order)))
  );
}