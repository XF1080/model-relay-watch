import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/lib/es/base/constants';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ConfigContext from '../configProvider/context';
import '@douyinfe/semi-foundation/lib/es/_portal/portal.css';
const defaultGetContainer = () => document.body;
class Portal extends PureComponent {
  constructor(props, context) {
    var _this;
    super(props);
    _this = this;
    this.initContainer = function (context) {
      let catchError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _a, _b;
      try {
        let container = undefined;
        if (!_this.el || !((_a = _this.state) === null || _a === void 0 ? void 0 : _a.container) || !Array.from(_this.state.container.childNodes).includes(_this.el)) {
          _this.el = document.createElement('div');
          const getContainer = _this.props.getPopupContainer || context.getPopupContainer || defaultGetContainer;
          const portalContainer = getContainer();
          portalContainer.appendChild(_this.el);
          _this.addStyle(_this.props.style);
          _this.addClass(_this.props.prefixCls, context, _this.props.className);
          container = portalContainer;
          return container;
        }
      } catch (e) {
        if (!catchError) {
          throw e;
        }
      }
      return (_b = _this.state) === null || _b === void 0 ? void 0 : _b.container;
    };
    this.addStyle = function () {
      let style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (_this.el) {
        for (const key of Object.keys(style)) {
          _this.el.style[key] = style[key];
        }
      }
    };
    this.addClass = function (prefixCls) {
      let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.context;
      const {
        direction
      } = context;
      for (var _len = arguments.length, classNames = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        classNames[_key - 2] = arguments[_key];
      }
      const cls = classnames(prefixCls, ...classNames, {
        [`${prefixCls}-rtl`]: direction === 'rtl'
      });
      if (_this.el) {
        _this.el.className = cls;
      }
    };
    this.state = {
      container: this.initContainer(context, true)
    };
  }
  componentDidMount() {
    const container = this.initContainer(this.context);
    if (container !== this.state.container) {
      this.setState({
        container
      });
    }
  }
  componentDidUpdate(prevProps) {
    // visible callback
    const {
      didUpdate
    } = this.props;
    if (didUpdate) {
      didUpdate(prevProps);
    }
  }
  componentWillUnmount() {
    const {
      container
    } = this.state;
    if (container) {
      container.removeChild(this.el);
    }
  }
  render() {
    const {
      state,
      props
    } = this;
    if (state.container) {
      return /*#__PURE__*/createPortal(props.children, this.el);
    }
    return null;
  }
}
Portal.contextType = ConfigContext;
Portal.defaultProps = {
  // getPopupContainer: () => document.body,
  prefixCls: `${BASE_CLASS_PREFIX}-portal`
};
Portal.propTypes = {
  children: PropTypes.node,
  prefixCls: PropTypes.string,
  getPopupContainer: PropTypes.func,
  className: PropTypes.string,
  didUpdate: PropTypes.func
};
export default Portal;