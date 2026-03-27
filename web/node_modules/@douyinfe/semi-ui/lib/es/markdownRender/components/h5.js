import * as React from 'react';
import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/markdownRender/constants';
const h5 = props => {
  return /*#__PURE__*/React.createElement(Typography.Title, Object.assign({
    heading: 5,
    className: `${cssClasses.PREFIX}-component-header`
  }, props));
};
export default h5;