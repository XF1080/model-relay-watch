import _pick from "lodash/pick";
import React from 'react';
import cls from 'classnames';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import Container from '../container';
import Content from './content';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import LocaleConsumer from '../../locale/localeConsumer';
const prefixCls = cssClasses.ANNOTATION;
class Annotation extends BaseComponent {
  render() {
    const containerProps = _pick(this.props, ['title', 'style', 'visible', 'motion', 'minWidth', 'maxWidth', 'onCancel', 'afterVisibleChange', 'resizable', 'defaultSize', 'children', 'className']);
    const contentProps = _pick(this.props, ['activeKey', 'info', 'onChange', 'onClick', 'renderItem']);
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Sidebar"
    }, locale => {
      var _a;
      return /*#__PURE__*/React.createElement(Container, Object.assign({}, containerProps, {
        className: cls(prefixCls, {
          [containerProps.className]: containerProps.className
        }),
        title: (_a = containerProps.title) !== null && _a !== void 0 ? _a : locale.annotationTitle
      }), /*#__PURE__*/React.createElement(Content, Object.assign({}, contentProps)));
    });
  }
}
Annotation.propTypes = Object.assign(Object.assign({}, Container.propTypes), {
  info: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  renderItem: PropTypes.func
});
Annotation.AnnotationContent = Content;
Annotation.__SemiComponentName__ = "Sidebar.Annotation";
Annotation.defaultProps = {};
export default Annotation;