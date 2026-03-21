import React from 'react';
import { forwardStatics } from '@douyinfe/semi-foundation/lib/es/utils/object';
import { numbers, strings } from '@douyinfe/semi-foundation/lib/es/datePicker/constants';
import DatePicker from './datePicker';
import ConfigContext from '../configProvider/context';
import LocaleConsumer from '../locale/localeConsumer';
export default forwardStatics(/*#__PURE__*/React.forwardRef((props, ref) => {
  const propsObj = Object.assign({}, props);
  const {
    type,
    format,
    rangeSeparator
  } = propsObj;
  if (typeof format === 'string' && format) {
    if (!/[Hhms]+/.test(format)) {
      if (type === 'dateTime') {
        propsObj.type = 'date';
      } else if (type === 'dateTimeRange') {
        propsObj.type = 'dateRange';
      }
    }
  }
  // Add spaces at both ends to prevent conflicts with characters in the date when separating
  if (rangeSeparator && typeof rangeSeparator === 'string') {
    propsObj.rangeSeparator = ` ${rangeSeparator.trim()} `;
  }
  if (propsObj.insetInput) {
    if (!propsObj.position) {
      propsObj.position = strings.POSITION_INLINE_INPUT;
    }
    /**
     * When insetInput is `true` and `position` includes `over`, use 1px `spacing` to solve the problem of border-radius leakage in the upper left corner
     *
     * @see https://user-images.githubusercontent.com/26477537/158817185-126a5f33-41f7-414a-8e36-8d1be2dda5cd.png
     */
    if (propsObj.position.includes('Over') && !propsObj.spacing) {
      propsObj.spacing = numbers.SPACING_INSET_INPUT;
    }
  }
  return /*#__PURE__*/React.createElement(ConfigContext.Consumer, null, _ref => {
    let {
      timeZone
    } = _ref;
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: 'DatePicker'
    }, (locale, localeCode, dateFnsLocale) => (/*#__PURE__*/React.createElement(DatePicker, Object.assign({
      timeZone: timeZone,
      localeCode: localeCode,
      locale: locale,
      dateFnsLocale: dateFnsLocale
    }, propsObj, {
      ref: ref
    }))));
  });
}), DatePicker);