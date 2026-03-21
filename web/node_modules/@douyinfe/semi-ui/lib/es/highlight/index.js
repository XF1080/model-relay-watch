import React, { PureComponent } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/highlight/constants';
import HighlightFoundation from '@douyinfe/semi-foundation/lib/es/highlight/foundation';
import '@douyinfe/semi-foundation/lib/es/highlight/highlight.css';
const prefixCls = cssClasses.PREFIX;
class Highlight extends PureComponent {
  constructor() {
    super(...arguments);
    this.getHighLightTextHTML = _ref => {
      let {
        sourceString = '',
        searchWords = [],
        option = {
          autoEscape: true,
          caseSensitive: false
        }
      } = _ref;
      const chunks = new HighlightFoundation().findAll(Object.assign({
        sourceString,
        searchWords
      }, option));
      const markEle = option.highlightTag || 'mark';
      const highlightClassName = option.highlightClassName || '';
      const highlightStyle = option.highlightStyle || {};
      return chunks.map((chunk, index) => {
        const {
          end,
          start,
          highlight,
          style,
          className
        } = chunk;
        const text = sourceString.substr(start, end - start);
        if (highlight) {
          return /*#__PURE__*/React.createElement(markEle, {
            style: Object.assign(Object.assign({}, highlightStyle), style),
            className: `${highlightClassName} ${className || ''}`.trim(),
            key: text + index
          }, text);
        } else {
          return text;
        }
      });
    };
  }
  render() {
    const {
      searchWords,
      sourceString,
      component,
      highlightClassName,
      highlightStyle,
      caseSensitive,
      autoEscape
    } = this.props;
    const tagCls = cls({
      [`${prefixCls}-tag`]: true
    }, highlightClassName);
    const option = {
      highlightTag: component,
      highlightClassName: tagCls,
      highlightStyle,
      caseSensitive,
      autoEscape
    };
    return this.getHighLightTextHTML({
      sourceString,
      searchWords,
      option
    });
  }
}
Highlight.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  autoEscape: PropTypes.bool,
  caseSensitive: PropTypes.bool,
  sourceString: PropTypes.string,
  searchWords: PropTypes.arrayOf(PropTypes.string),
  highlightStyle: PropTypes.object,
  highlightClassName: PropTypes.string,
  component: PropTypes.string
};
Highlight.defaultProps = {
  component: 'mark',
  autoEscape: true,
  caseSensitive: false,
  sourceString: ''
};
export default Highlight;