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
import { strings } from '@douyinfe/semi-foundation/lib/es/typography/constants';
import Base from './base';
export default class Title extends PureComponent {
  render() {
    const _a = this.props,
      {
        heading
      } = _a,
      rest = __rest(_a, ["heading"]);
    const component = strings.HEADING.indexOf(heading) !== -1 ? `h${heading}` : 'h1';
    // Passing headings to support custom components
    return /*#__PURE__*/React.createElement(Base, Object.assign({
      component: component,
      heading: component
    }, rest));
  }
}
Title.propTypes = {
  copyable: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  delete: PropTypes.bool,
  disabled: PropTypes.bool,
  // editable: PropTypes.bool,
  ellipsis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mark: PropTypes.bool,
  link: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  underline: PropTypes.bool,
  strong: PropTypes.bool,
  type: PropTypes.oneOf(strings.TYPE),
  heading: PropTypes.oneOf(strings.HEADING),
  style: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.oneOf(strings.WEIGHT), PropTypes.number])
};
Title.defaultProps = {
  copyable: false,
  delete: false,
  disabled: false,
  // editable: false,
  ellipsis: false,
  mark: false,
  underline: false,
  strong: false,
  link: false,
  type: 'primary',
  heading: 1,
  style: {},
  className: ''
};