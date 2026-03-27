import * as React from 'react';
import BaseComponent from '../_base/baseComponent';
import CodeHighlightFoundation from '@douyinfe/semi-foundation/lib/es/codeHighlight';
import '@douyinfe/semi-foundation/lib/es/codeHighlight/codeHighlight.css';
import { getDefaultPropsFromGlobalConfig } from '../_utils';
import PropTypes from 'prop-types';
import cls from "classnames";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/codeHighlight/constants';
class CodeHighlight extends BaseComponent {
  constructor(props) {
    super(props);
    this.codeRef = /*#__PURE__*/React.createRef();
    this.foundation = new CodeHighlightFoundation(this.adapter);
    this.state = {};
  }
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  componentDidMount() {
    super.componentDidMount();
    if (this.codeRef.current) {
      this.foundation.highlightCode(this.codeRef.current, this.props.language);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.codeRef.current && prevProps.code !== this.props.code || this.props.language !== this.props.language) {
      this.foundation.highlightCode(this.codeRef.current, this.props.language);
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("div", Object.assign({
      style: this.props.style,
      className: cls(this.props.className, cssClasses.PREFIX, "semi-light-scrollbar", {
        [`${cssClasses.PREFIX}-defaultTheme`]: this.props.defaultTheme
      })
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", {
      ref: this.codeRef
    }, this.props.code)));
  }
}
CodeHighlight.__SemiComponentName__ = "CodeHighlight";
CodeHighlight.propTypes = {
  className: PropTypes.string,
  style: PropTypes.any,
  code: PropTypes.string,
  language: PropTypes.string,
  lineNumber: PropTypes.bool,
  defaultTheme: PropTypes.bool
};
CodeHighlight.defaultProps = getDefaultPropsFromGlobalConfig(CodeHighlight.__SemiComponentName__, {
  lineNumber: true,
  defaultTheme: true
});
export default CodeHighlight;