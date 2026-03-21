import { Select } from '../../index';
import getConfigureItem from './getConfigureItem';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
export default getConfigureItem(Select, {
  className: `${cssClasses.PREFIX}-footer-configure-select`
});