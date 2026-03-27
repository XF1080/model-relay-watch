import _noop from "lodash/noop";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { IconCaretup, IconCaretdown } from '@douyinfe/semi-icons';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/table/constants';
import Tooltip from '../tooltip';
import isEnterPress from '@douyinfe/semi-foundation/lib/es/utils/isEnterPress';
import { getNextSortOrder } from './utils';
import LocaleConsumer from '../locale/localeConsumer';
export default class ColumnSorter extends PureComponent {
  render() {
    const {
      prefixCls,
      onClick,
      sortOrder,
      style,
      title,
      sortIcon,
      showTooltip
    } = this.props;
    const iconBtnSize = 'default';
    const upCls = cls(`${prefixCls}-column-sorter-up`, {
      on: sortOrder === strings.SORT_DIRECTIONS[0]
    });
    const downCls = cls(`${prefixCls}-column-sorter-down`, {
      on: sortOrder === strings.SORT_DIRECTIONS[1]
    });
    const ariaProps = {
      /**
       * Set 'aria-sort' to aria-columnheader is difficult, so set 'aria-label' about sort info to sorter
       * reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaSort
       */
      'aria-label': `Current sort order is ${sortOrder ? `${sortOrder}ing` : 'none'}`,
      'aria-roledescription': 'Sort data with this column'
    };
    const renderSortIcon = () => {
      if (typeof sortIcon === 'function') {
        return sortIcon({
          sortOrder
        });
      } else {
        const node = /*#__PURE__*/React.createElement("div", {
          style: style,
          className: `${prefixCls}-column-sorter`
        }, /*#__PURE__*/React.createElement("span", {
          className: `${upCls}`
        }, /*#__PURE__*/React.createElement(IconCaretup, {
          size: iconBtnSize
        })), /*#__PURE__*/React.createElement("span", {
          className: `${downCls}`
        }, /*#__PURE__*/React.createElement(IconCaretdown, {
          size: iconBtnSize
        })));
        if (showTooltip) {
          let content = getNextSortOrder(sortOrder);
          return /*#__PURE__*/React.createElement(LocaleConsumer, {
            componentName: "Table"
          }, (locale, localeCode) => (/*#__PURE__*/React.createElement(Tooltip, {
            content: locale[content]
          }, node)));
        }
        return node;
      }
    };
    return /*#__PURE__*/React.createElement("div", Object.assign({
      role: "button"
    }, ariaProps, {
      tabIndex: -1,
      className: `${prefixCls}-column-sorter-wrapper`,
      onClick: onClick,
      onKeyPress: e => isEnterPress(e) && onClick(e)
    }), title, renderSortIcon());
  }
}
ColumnSorter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  prefixCls: PropTypes.string,
  sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sortIcon: PropTypes.func,
  showTooltip: PropTypes.bool
};
ColumnSorter.defaultProps = {
  prefixCls: cssClasses.PREFIX,
  onClick: _noop,
  sortOrder: false,
  showTooltip: false
};