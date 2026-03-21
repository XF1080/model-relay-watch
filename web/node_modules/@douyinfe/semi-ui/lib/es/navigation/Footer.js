import _noop from "lodash/noop";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { strings, cssClasses } from '@douyinfe/semi-foundation/lib/es/navigation/constants';
import CollapseButton from './CollapseButton';
import '@douyinfe/semi-foundation/lib/es/navigation/navigation.css';
import NavContext from './nav-context';
export default class NavFooter extends PureComponent {
  constructor() {
    super(...arguments);
    this.renderCollapseButton = () => {
      const {
        collapseButton,
        collapseText
      } = this.props;
      if (/*#__PURE__*/React.isValidElement(collapseButton)) {
        return collapseButton;
      }
      const {
        onCollapseChange,
        prefixCls,
        locale,
        isCollapsed
      } = this.context;
      return /*#__PURE__*/React.createElement(CollapseButton, {
        prefixCls: prefixCls,
        isCollapsed: isCollapsed,
        locale: locale,
        onClick: onCollapseChange,
        collapseText: collapseText
      });
    };
  }
  render() {
    const {
      style,
      className,
      collapseButton,
      onClick
    } = this.props;
    let {
      children
    } = this.props;
    const {
      isCollapsed,
      mode
    } = this.context;
    if (! /*#__PURE__*/React.isValidElement(children) && collapseButton && mode !== strings.MODE_HORIZONTAL) {
      children = this.renderCollapseButton();
    }
    const wrapCls = cls(className, `${cssClasses.PREFIX}-footer`, {
      [`${cssClasses.PREFIX}-footer-collapsed`]: isCollapsed
    });
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      React.createElement("div", {
        className: wrapCls,
        style: style,
        onClick: onClick
      }, children)
    );
  }
}
NavFooter.contextType = NavContext;
NavFooter.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  collapseButton: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  collapseText: PropTypes.func,
  onClick: PropTypes.func
};
NavFooter.defaultProps = {
  collapseButton: false,
  onClick: _noop
};
NavFooter.elementType = "NavFooter";