import React, { useContext } from 'react';
import BasicStep from './basicStep';
import FillStep from './fillStep';
import NavStep from './navStep';
import Context from './context';
const Step = props => {
  const {
    type
  } = useContext(Context);
  const renderStep = () => {
    switch (type) {
      case 'fill':
        return /*#__PURE__*/React.createElement(FillStep, Object.assign({}, props));
      case 'basic':
        return /*#__PURE__*/React.createElement(BasicStep, Object.assign({}, props));
      case 'nav':
        return /*#__PURE__*/React.createElement(NavStep, Object.assign({}, props));
      default:
        return null;
    }
  };
  return renderStep();
};
export default Step;