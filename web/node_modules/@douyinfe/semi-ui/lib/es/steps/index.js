var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/es/steps/steps.css';
import Step from './step';
import FillSteps from './fillSteps';
import BasicSteps from './basicSteps';
import NavSteps from './navSteps';
import Context from './context';
class Steps extends Component {
  renderComponent() {
    const _a = this.props,
      {
        type
      } = _a,
      restProps = __rest(_a, ["type"]);
    switch (type) {
      case 'fill':
        return /*#__PURE__*/React.createElement(FillSteps, Object.assign({}, restProps));
      case 'basic':
        return /*#__PURE__*/React.createElement(BasicSteps, Object.assign({}, restProps));
      case 'nav':
        return /*#__PURE__*/React.createElement(NavSteps, Object.assign({}, restProps));
      default:
        return null;
    }
  }
  render() {
    const {
      type
    } = this.props;
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        type
      }
    }, this.renderComponent());
  }
}
Steps.Step = Step;
Steps.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['fill', 'basic', 'nav']),
  size: PropTypes.oneOf(['small', 'default'])
};
Steps.defaultProps = {
  type: 'fill',
  size: 'default'
};
export default Steps;