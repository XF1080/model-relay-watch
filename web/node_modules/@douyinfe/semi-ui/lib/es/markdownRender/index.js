var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import * as React from 'react';
import BaseComponent from '../_base/baseComponent';
import MarkdownRenderFoundation from '@douyinfe/semi-foundation/lib/es/markdownRender/foundation';
import '@douyinfe/semi-foundation/lib/es/markdownRender/markdownRender.css';
import * as runtime from 'react/jsx-runtime';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/markdownRender/constants';
import * as SemiMarkdownComponents from "./components";
import cls from "classnames";
import PropTypes from 'prop-types';
import { getDefaultPropsFromGlobalConfig } from '../_utils';
class MarkdownRender extends BaseComponent {
  constructor(props) {
    super(props);
    this.foundation = new MarkdownRenderFoundation(this.adapter);
    this.state = {
      MDXContentComponent: "div"
    };
  }
  componentDidMount() {
    (() => __awaiter(this, void 0, void 0, function* () {
      this.setState({
        MDXContentComponent: yield this.foundation.evaluate(this.props.raw)
      });
    }))();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.raw !== this.props.raw) {
      (() => __awaiter(this, void 0, void 0, function* () {
        this.setState({
          MDXContentComponent: yield this.foundation.evaluate(this.props.raw)
        });
      }))();
    }
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getRuntime: () => runtime
    });
  }
  render() {
    const ComponentConstructor = this.state.MDXContentComponent;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: cls(cssClasses.PREFIX, this.props.className),
      style: this.props.style
    }, this.getDataAttr()), /*#__PURE__*/React.createElement(ComponentConstructor, {
      components: Object.assign(Object.assign({}, SemiMarkdownComponents), this.props.components)
    }));
  }
}
MarkdownRender.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  format: PropTypes.string,
  components: PropTypes.any,
  raw: PropTypes.string,
  remarkPlugins: PropTypes.arrayOf(PropTypes.any),
  rehypePlugins: PropTypes.arrayOf(PropTypes.any),
  remarkGfm: PropTypes.bool
};
MarkdownRender.__SemiComponentName__ = "MarkdownRender";
MarkdownRender.defaultProps = getDefaultPropsFromGlobalConfig(MarkdownRender.__SemiComponentName__, {
  format: "mdx",
  remarkGfm: true
});
MarkdownRender.defaultComponents = SemiMarkdownComponents;
export default MarkdownRender;