import React, { forwardRef } from 'react';
import { FormApiContext } from '../context';
function withFormApi(Component) {
  let WithApiCom = (props, ref) => {
    return /*#__PURE__*/React.createElement(FormApiContext.Consumer, null, formApi => (/*#__PURE__*/React.createElement(Component, Object.assign({
      formApi: formApi,
      ref: ref
    }, props))));
  };
  WithApiCom = /*#__PURE__*/forwardRef(WithApiCom);
  return WithApiCom;
}
export default withFormApi;