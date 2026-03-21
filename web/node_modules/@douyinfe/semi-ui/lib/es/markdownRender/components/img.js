import _omit from "lodash/omit";
import * as React from 'react';
import Image from '../../image';
import { IconUploadError } from "@douyinfe/semi-icons";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/markdownRender/constants';
const img = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: `${cssClasses.PREFIX}-component-image`
  }, /*#__PURE__*/React.createElement(Image, Object.assign({
    fallback: /*#__PURE__*/React.createElement(IconUploadError, null),
    width: "100%"
  }, _omit(props, 'children'))), /*#__PURE__*/React.createElement("div", {
    className: `${cssClasses.PREFIX}-component-image-alt`
  }, props.alt));
};
export default img;