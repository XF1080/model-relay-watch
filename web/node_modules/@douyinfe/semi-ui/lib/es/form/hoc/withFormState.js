import React, { forwardRef } from 'react';
import { FormStateContext } from '../context';
function withFormState(Component) {
  let WithStateCom = (props, ref) => {
    return /*#__PURE__*/React.createElement(FormStateContext.Consumer, null, formState => /*#__PURE__*/React.createElement(Component, Object.assign({
      formState: formState,
      ref: ref
    }, props)));
  };
  WithStateCom = /*#__PURE__*/forwardRef(WithStateCom);
  return WithStateCom;
}
export default withFormState;