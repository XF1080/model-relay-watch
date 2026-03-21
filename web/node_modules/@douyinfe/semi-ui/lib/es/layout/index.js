var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/layout/constants';
import '@douyinfe/semi-foundation/lib/es/layout/layout.css';
import LayoutContext from './layout-context';
import Sider from './Sider';
const htmlTag = {
  Header: 'header',
  Footer: 'footer',
  Content: 'main',
  Layout: 'section'
};
function generator(type) {
  const tagName = htmlTag[type];
  const typeName = type.toLowerCase();
  return BasicComponent => class Adapter extends React.PureComponent {
    render() {
      return /*#__PURE__*/React.createElement(BasicComponent, Object.assign({
        role: this.props.role,
        "aria-label": this.props['aria-label'],
        type: typeName,
        tagName: tagName
      }, this.props));
    }
  };
}
class Basic extends React.PureComponent {
  render() {
    const _a = this.props,
      {
        prefixCls,
        type,
        className,
        children,
        tagName
      } = _a,
      others = __rest(_a, ["prefixCls", "type", "className", "children", "tagName"]);
    const classString = cls(className, `${prefixCls}-${type}`);
    return /*#__PURE__*/React.createElement(tagName, Object.assign({
      className: classString
    }, others), children);
  }
}
Basic.propTypes = {
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};
Basic.defaultProps = {
  prefixCls: cssClasses.PREFIX
};
const Header = generator('Header')(Basic);
const Footer = generator('Footer')(Basic);
const Content = generator('Content')(Basic);
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siders: []
    };
  }
  getSiderHook() {
    return {
      addSider: id => {
        this.setState(state => ({
          siders: [...state.siders, id]
        }));
      },
      removeSider: id => {
        this.setState(state => ({
          siders: state.siders.filter(curr => curr !== id)
        }));
      }
    };
  }
  render() {
    const _a = this.props,
      {
        prefixCls,
        className,
        children,
        hasSider,
        tagName
      } = _a,
      others = __rest(_a, ["prefixCls", "className", "children", "hasSider", "tagName"]);
    const {
      siders
    } = this.state;
    const classString = cls(className, prefixCls, {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' && hasSider || siders.length > 0 || React.Children.toArray(children).some(child => {
        return /*#__PURE__*/React.isValidElement(child) && child.type && child.type.elementType === "Layout.Sider";
      })
    });
    const Tag = tagName;
    return /*#__PURE__*/React.createElement(LayoutContext.Provider, {
      value: {
        siderHook: this.getSiderHook()
      }
    }, /*#__PURE__*/React.createElement(Tag, Object.assign({
      className: classString
    }, others), children));
  }
}
Layout.propTypes = {
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};
Layout.defaultProps = {
  prefixCls: cssClasses.PREFIX,
  tagName: 'section'
};
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
export { Layout };
export default Layout;