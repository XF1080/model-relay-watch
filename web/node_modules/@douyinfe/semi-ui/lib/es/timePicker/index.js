import _get from "lodash/get";
import React from 'react';
import LocaleConsumer from '../locale/localeConsumer';
import BaseTimePicker from './TimePicker';
import ConfigContext from '../configProvider/context';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
export default class LocaleTimePicker extends React.PureComponent {
  render() {
    const {
      type
    } = this.props;
    return /*#__PURE__*/React.createElement(ConfigContext.Consumer, null, _ref => {
      let {
        timeZone
      } = _ref;
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "TimePicker"
      }, (locale, localeCode, dateFnsLocale) => (/*#__PURE__*/React.createElement(BaseTimePicker, Object.assign({
        timeZone: timeZone,
        placeholder: _get(locale, ['placeholder', type])
      }, this.props, {
        locale: locale,
        localeCode: localeCode,
        dateFnsLocale: dateFnsLocale
      }))));
    });
  }
}
LocaleTimePicker.propTypes = BaseTimePicker.propTypes;
LocaleTimePicker.__SemiComponentName__ = "TimePicker";
LocaleTimePicker.defaultProps = getDefaultPropsFromGlobalConfig(LocaleTimePicker.__SemiComponentName__, BaseTimePicker.defaultProps);