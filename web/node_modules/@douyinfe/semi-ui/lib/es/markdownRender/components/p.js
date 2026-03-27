import * as React from 'react';
import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/markdownRender/constants';
const p = props => {
  return /*#__PURE__*/React.createElement(Typography.Paragraph, Object.assign({
    className: `${cssClasses.PREFIX}-component-p`
  }, props));
};
export default p;