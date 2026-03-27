import _isString from "lodash/isString";
import _omit from "lodash/omit";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/card/constants';
import '@douyinfe/semi-foundation/lib/es/card/card.css';
import Meta from './meta';
import cls from 'classnames';
import Skeleton from '../skeleton';
import Typography from '../typography';
import Space from '../space';
const prefixcls = cssClasses.PREFIX;
class Card extends PureComponent {
  constructor() {
    super(...arguments);
    this.renderHeader = () => {
      const {
        title,
        headerExtraContent,
        header,
        headerLine,
        headerStyle
      } = this.props;
      const headerCls = cls(`${prefixcls}-header`, {
        [`${prefixcls}-header-bordered`]: Boolean(headerLine)
      });
      const headerWrapperCls = cls(`${prefixcls}-header-wrapper`);
      const titleCls = cls(`${prefixcls}-header-wrapper-title`, {
        [`${prefixcls}-header-wrapper-spacing`]: Boolean(headerExtraContent)
      });
      if (header || headerExtraContent || title) {
        return /*#__PURE__*/React.createElement("div", {
          style: headerStyle,
          className: headerCls
        }, header || (
        /*#__PURE__*/
        // Priority of header over title and headerExtraContent
        React.createElement("div", {
          className: headerWrapperCls
        }, headerExtraContent && (/*#__PURE__*/React.createElement("div", {
          className: `${prefixcls}-header-wrapper-extra`,
          "x-semi-prop": "headerExtraContent"
        }, headerExtraContent)), title && (/*#__PURE__*/React.createElement("div", {
          className: titleCls
        }, _isString(title) ? (/*#__PURE__*/React.createElement(Typography.Title, {
          heading: 6,
          ellipsis: {
            showTooltip: true,
            rows: 1
          },
          "x-semi-prop": "title"
        }, title)) : title)))));
      }
      return null;
    };
    this.renderCover = () => {
      const {
        cover
      } = this.props;
      const coverCls = cls(`${prefixcls}-cover`);
      return cover && (/*#__PURE__*/React.createElement("div", {
        className: coverCls,
        "x-semi-prop": "cover"
      }, cover));
    };
    this.renderBody = () => {
      const {
        bodyStyle,
        children,
        actions,
        loading
      } = this.props;
      const bodyCls = cls(`${prefixcls}-body`);
      const actionsCls = cls(`${prefixcls}-body-actions`);
      const actionsItemCls = cls(`${prefixcls}-body-actions-item`);
      const placeholder = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Skeleton.Title, null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Skeleton.Paragraph, {
        rows: 3
      }));
      return /*#__PURE__*/React.createElement("div", {
        style: bodyStyle,
        className: bodyCls
      }, children && (/*#__PURE__*/React.createElement(Skeleton, {
        placeholder: placeholder,
        loading: loading,
        active: true
      }, children)), Array.isArray(actions) && (/*#__PURE__*/React.createElement("div", {
        className: actionsCls
      }, /*#__PURE__*/React.createElement(Space, {
        spacing: 12
      }, actions.map((item, idx) => (/*#__PURE__*/React.createElement("div", {
        key: idx,
        className: actionsItemCls,
        "x-semi-prop": `actions.${idx}`
      }, item)))))));
    };
    this.renderFooter = () => {
      const {
        footer,
        footerLine,
        footerStyle
      } = this.props;
      const footerCls = cls(`${prefixcls}-footer`, {
        [`${prefixcls}-footer-bordered`]: footerLine
      });
      return footer && (/*#__PURE__*/React.createElement("div", {
        style: footerStyle,
        className: footerCls,
        "x-semi-prop": "footer"
      }, footer));
    };
  }
  render() {
    const _a = this.props,
      {
        bordered,
        shadows,
        style,
        className
      } = _a,
      otherProps = __rest(_a, ["bordered", "shadows", "style", "className"]);
    const others = _omit(otherProps, ['actions', 'bodyStyle', 'cover', 'headerExtraContent', 'footer', 'footerLine', 'footerStyle', 'header', 'headerLine', 'headerStyle', 'loading', 'title']);
    const cardCls = cls(prefixcls, className, {
      [`${prefixcls}-bordered`]: bordered,
      [`${prefixcls}-shadows`]: shadows,
      [`${prefixcls}-shadows-${shadows}`]: shadows
    });
    return /*#__PURE__*/React.createElement("div", Object.assign({}, others, {
      "aria-busy": this.props.loading,
      className: cardCls,
      style: style
    }), this.renderHeader(), this.renderCover(), this.renderBody(), this.renderFooter());
  }
}
Card.Meta = Meta;
Card.propTypes = {
  actions: PropTypes.array,
  bodyStyle: PropTypes.object,
  bordered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  cover: PropTypes.node,
  footer: PropTypes.node,
  footerLine: PropTypes.bool,
  footerStyle: PropTypes.object,
  header: PropTypes.node,
  headerExtraContent: PropTypes.node,
  headerLine: PropTypes.bool,
  headerStyle: PropTypes.object,
  loading: PropTypes.bool,
  shadows: PropTypes.oneOf(strings.SHADOWS),
  style: PropTypes.object,
  title: PropTypes.node,
  'aria-label': PropTypes.string
};
Card.defaultProps = {
  bordered: true,
  footerLine: false,
  headerLine: true,
  loading: false
};
export default Card;