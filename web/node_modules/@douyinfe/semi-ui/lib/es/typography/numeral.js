import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { strings } from '@douyinfe/semi-foundation/lib/es/typography/constants';
import Base from './base';
import FormatNumeral from '@douyinfe/semi-foundation/lib/es/typography/formatNumeral';
export default class Numeral extends PureComponent {
  // Traverse the entire virtual DOM using a depth-first traversal algorithm, then format each piece. (in react)
  formatNodeDFS(node) {
    if (!Array.isArray(node)) {
      node = [node];
    }
    // Because the property is read-only, an object is returned for overwriting rather than directly modifying the object's contents.
    node = node.map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        // Formatting the digital content of nodes.
        return new FormatNumeral(String(item), this.props.rule, this.props.precision, this.props.truncate, this.props.parser).format();
      }
      if (typeof item === 'function') {
        return this.formatNodeDFS(item());
      }
      if (typeof item === 'object' && 'children' in item['props']) {
        return Object.assign(Object.assign({}, item), {
          props: Object.assign(Object.assign({}, item['props']), {
            children: this.formatNodeDFS(item['props']['children'])
          })
        });
      }
      return item;
    });
    return node.length === 1 ? node[0] : node;
  }
  render() {
    // Deep copy and remove props that are not needed by the Base component.
    const baseProps = Object.assign({}, this.props);
    delete baseProps.rule;
    delete baseProps.parser;
    // Each piece of content in the virtual DOM is formatted by the `formatNumeral` function.
    baseProps.children = this.formatNodeDFS(this.props.children);
    return /*#__PURE__*/React.createElement(Base, Object.assign({
      component: 'span'
    }, baseProps));
  }
}
Numeral.propTypes = {
  rule: PropTypes.oneOf(strings.RULE),
  precision: PropTypes.number,
  truncate: PropTypes.oneOf(strings.TRUNCATE),
  parser: PropTypes.func,
  copyable: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  delete: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  mark: PropTypes.bool,
  underline: PropTypes.bool,
  link: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  strong: PropTypes.bool,
  type: PropTypes.oneOf(strings.TYPE),
  size: PropTypes.oneOf(strings.SIZE),
  style: PropTypes.object,
  className: PropTypes.string,
  code: PropTypes.bool,
  component: PropTypes.string
};
Numeral.defaultProps = {
  rule: 'text',
  precision: 0,
  truncate: 'round',
  parser: undefined,
  copyable: false,
  delete: false,
  icon: '',
  mark: false,
  underline: false,
  strong: false,
  link: false,
  type: 'primary',
  style: {},
  size: 'normal',
  className: ''
};