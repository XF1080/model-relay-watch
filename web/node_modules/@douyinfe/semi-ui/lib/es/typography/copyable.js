import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/index';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/typography/constants';
import copy from 'copy-text-to-clipboard';
import cls from 'classnames';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import LocaleConsumer from '../locale/localeConsumer';
import { IconCopy, IconTick } from '@douyinfe/semi-icons';
import isEnterPress from '@douyinfe/semi-foundation/lib/es/utils/isEnterPress';
const prefixCls = cssClasses.PREFIX;
export class Copyable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copy = e => {
      const {
        content,
        duration,
        onCopy
      } = this.props;
      const res = copy(content);
      onCopy && onCopy(e, content, res);
      this.setCopied(content, duration);
    };
    this.setCopied = (item, timer) => {
      this.setState({
        copied: true,
        item
      });
      this._timeId = setTimeout(() => {
        this.resetCopied();
      }, timer * 1000);
    };
    this.resetCopied = () => {
      if (this._timeId) {
        clearTimeout(this._timeId);
        this._timeId = null;
        this.setState({
          copied: false,
          item: ''
        });
      }
    };
    this.renderSuccessTip = () => {
      const {
        successTip
      } = this.props;
      if (typeof successTip !== 'undefined') {
        return successTip;
      }
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Typography"
      }, locale => (/*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(IconTick, null), locale.copied)));
    };
    this.renderCopyIcon = () => {
      const {
        icon
      } = this.props;
      const copyProps = {
        role: "button",
        tabIndex: 0,
        onClick: this.copy,
        onKeyPress: e => isEnterPress(e) && this.copy(e)
      };
      {/* TODO: replace `a` tag with `span` in next major version
         NOTE: may have effect on style */
      }
      const defaultIcon =
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      React.createElement("a", {
        className: `${prefixCls}-action-copy-icon`
      }, /*#__PURE__*/React.createElement(IconCopy, Object.assign({
        onClick: this.copy
      }, copyProps)));
      return /*#__PURE__*/React.isValidElement(icon) ? /*#__PURE__*/React.cloneElement(icon, copyProps) : defaultIcon;
    };
    this.state = {
      copied: false,
      item: ''
    };
  }
  componentWillUnmount() {
    if (this._timeId) {
      clearTimeout(this._timeId);
      this._timeId = null;
    }
  }
  render() {
    const {
      style,
      className,
      forwardRef,
      copyTip,
      render
    } = this.props;
    const {
      copied
    } = this.state;
    const finalCls = cls(className, {
      [`${prefixCls}-action-copy`]: !copied,
      [`${prefixCls}-action-copied`]: copied
    });
    if (render) {
      return render(copied, this.copy, this.props);
    }
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Typography"
    }, locale => (/*#__PURE__*/React.createElement("span", {
      style: Object.assign({
        marginLeft: '4px'
      }, style),
      className: finalCls,
      ref: forwardRef
    }, copied ? this.renderSuccessTip() : (/*#__PURE__*/React.createElement(Tooltip, {
      content: typeof copyTip !== 'undefined' ? copyTip : locale.copy
    }, this.renderCopyIcon())))));
  }
}
Copyable.propTypes = {
  content: PropTypes.string,
  onCopy: PropTypes.func,
  successTip: PropTypes.node,
  copyTip: PropTypes.node,
  duration: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.node
};
Copyable.defaultProps = {
  content: '',
  onCopy: noop,
  duration: 3,
  style: {},
  className: ''
};
export default Copyable;