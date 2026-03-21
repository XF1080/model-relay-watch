import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import React from 'react';
import PropTypes from 'prop-types';
import { isHTMLElement } from '../_base/reactUtils';
export default class ReactIntersectionObserver extends React.PureComponent {
  componentDidMount() {
    const {
      items
    } = this.props;
    this.cachedKeys = Object.keys(items);
    const {
      root,
      threshold,
      rootMargin,
      option,
      onIntersect
    } = this.props;
    this.observer = new IntersectionObserver(onIntersect, Object.assign({
      root,
      threshold,
      rootMargin
    }, option));
    this.observeElement();
  }
  componentDidUpdate() {
    const {
      items
    } = this.props;
    const itemKeys = Object.keys(items);
    if (!_isEqual(this.cachedKeys, itemKeys)) {
      this.observeElement(true);
      this.cachedKeys = itemKeys;
    }
  }
  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  observeElement() {
    let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const {
      items
    } = this.props;
    if (_isEmpty(items)) {
      // stop everything if not defined
      this.observer.disconnect();
      return;
    }
    if (force) {
      this.observer.disconnect();
    }
    // observer callback is invoked immediately when observing new elements
    Object.keys(items).forEach(key => {
      const node = items[key];
      if (!(node && isHTMLElement(node))) {
        return;
      }
      this.observer.observe(node);
    });
  }
  render() {
    const {
      children
    } = this.props;
    return children;
  }
}
ReactIntersectionObserver.propTypes = {
  onIntersect: PropTypes.func,
  option: PropTypes.object,
  root: PropTypes.any,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  items: PropTypes.object
};
ReactIntersectionObserver.defaultProps = {
  onIntersect: () => undefined,
  threshold: 0.75,
  rootMargin: '0px',
  option: {},
  items: {}
};