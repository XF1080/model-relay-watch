import React from 'react';
import BaseButton from './Button';
import IconButton from '../iconButton';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
class Button extends React.PureComponent {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
  }
  render() {
    const props = Object.assign({}, this.props);
    const hasIcon = Boolean(props.icon);
    const isLoading = Boolean(props.loading);
    const isDisabled = Boolean(props.disabled);
    if (hasIcon || isLoading && !isDisabled) {
      return /*#__PURE__*/React.createElement(IconButton, Object.assign({}, props));
    } else {
      return /*#__PURE__*/React.createElement(BaseButton, Object.assign({}, props));
    }
  }
}
Button.__SemiComponentName__ = "Button";
Button.propTypes = Object.assign(Object.assign({}, BaseButton.propTypes), IconButton.propTypes);
Button.defaultProps = getDefaultPropsFromGlobalConfig(Button.__SemiComponentName__);
Button.elementType = 'Button';
export default Button;