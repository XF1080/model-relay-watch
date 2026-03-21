"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _throttle2 = _interopRequireDefault(require("lodash/throttle"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _semiIcons = require("@douyinfe/semi-icons");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _divider = _interopRequireDefault(require("../divider"));
var _slider = _interopRequireDefault(require("../slider"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/image/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _previewFooterFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/image/previewFooterFoundation"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
const footerPrefixCls = `${_constants.cssClasses.PREFIX}-preview-footer`;
class Footer extends _baseComponent.default {
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    this.changeSliderValue = type => {
      this.foundation.changeSliderValue(type);
    };
    this.handleMinusClick = () => {
      this.changeSliderValue("minus");
    };
    this.handlePlusClick = () => {
      this.changeSliderValue("plus");
    };
    this.handleRotateLeft = () => {
      this.foundation.handleRotate("left");
    };
    this.handleRotateRight = () => {
      this.foundation.handleRotate("right");
    };
    this.handleSlideChange = (0, _throttle2.default)(value => {
      this.foundation.handleValueChange(value);
    }, 50);
    this.handleRatioClick = () => {
      this.foundation.handleRatioClick();
    };
    this.customRenderViewMenu = () => {
      const {
        min,
        max,
        step,
        curPage,
        totalNum,
        ratio,
        zoom,
        disabledPrev,
        disabledNext,
        disableDownload,
        onNext,
        onPrev,
        onDownload,
        renderPreviewMenu
      } = this.props;
      const props = {
        min,
        max,
        step,
        curPage,
        totalNum,
        ratio,
        zoom,
        disabledPrev,
        disabledNext,
        disableDownload,
        onNext,
        onPrev,
        onDownload,
        onRotateLeft: this.handleRotateLeft,
        onRotateRight: this.handleRotateRight,
        disabledZoomIn: zoom === max,
        disabledZoomOut: zoom === min,
        onRatioClick: this.handleRatioClick,
        onZoomIn: this.handlePlusClick,
        onZoomOut: this.handleMinusClick,
        menuItems: this.getMenu()
      };
      return renderPreviewMenu(props);
    };
    // According to showTooltip in props, decide whether to use Tooltip to pack a layer
    // 根据 props 中的 showTooltip 决定是否使用 Tooltip 包一层
    this.getFinalIconElement = function (element, content, key) {
      let gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      const {
        showTooltip,
        zIndex
      } = _this.props;
      return showTooltip ? (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: content,
        key: `tooltip-${key}`,
        zIndex: zIndex + 1
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)(`${prefixCls}-tooltip-children-wrapper`, {
          [`${footerPrefixCls}-gap`]: gap
        })
      }, element))) : element;
    };
    this.getLocalTextByKey = key => (/*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Image"
    }, locale => locale[key]));
    this.getIconChevronLeft = () => {
      const {
        disabledPrev,
        onPrev,
        prevTip
      } = this.props;
      const icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronLeft, {
        key: "chevron-left",
        size: "large",
        className: disabledPrev ? `${footerPrefixCls}-disabled` : "",
        onClick: !disabledPrev ? onPrev : undefined
      });
      const content = prevTip !== null && prevTip !== void 0 ? prevTip : this.getLocalTextByKey("prevTip");
      return this.getFinalIconElement(icon, content, 'chevron-left');
    };
    this.getIconChevronRight = () => {
      const {
        disabledNext,
        onNext,
        nextTip
      } = this.props;
      const icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRight, {
        key: "chevron-right",
        size: "large",
        className: disabledNext ? `${footerPrefixCls}-disabled` : "",
        onClick: !disabledNext ? onNext : undefined
      });
      const content = nextTip !== null && nextTip !== void 0 ? nextTip : this.getLocalTextByKey("nextTip");
      return this.getFinalIconElement(icon, content, 'chevron-right');
    };
    this.getIconMinus = () => {
      const {
        zoomOutTip,
        zoom,
        min
      } = this.props;
      const disabledZoomOut = zoom === min;
      const icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconMinus, {
        key: "minus",
        size: "large",
        onClick: !disabledZoomOut ? this.handleMinusClick : undefined,
        className: disabledZoomOut ? `${footerPrefixCls}-disabled` : ""
      });
      const content = zoomOutTip !== null && zoomOutTip !== void 0 ? zoomOutTip : this.getLocalTextByKey("zoomOutTip");
      return this.getFinalIconElement(icon, content, 'minus');
    };
    this.getIconPlus = () => {
      const {
        zoomInTip,
        zoom,
        max
      } = this.props;
      const disabledZoomIn = zoom === max;
      const icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconPlus, {
        key: "plus",
        size: "large",
        onClick: !disabledZoomIn ? this.handlePlusClick : undefined,
        className: disabledZoomIn ? `${footerPrefixCls}-disabled` : ""
      });
      const content = zoomInTip !== null && zoomInTip !== void 0 ? zoomInTip : this.getLocalTextByKey("zoomInTip");
      return this.getFinalIconElement(icon, content, 'plus');
    };
    this.getIconRatio = () => {
      const {
        ratio,
        originTip,
        adaptiveTip,
        showTooltip
      } = this.props;
      const props = {
        key: "ratio",
        size: "large",
        className: showTooltip ? undefined : `${footerPrefixCls}-gap`,
        onClick: this.handleRatioClick
      };
      const icon = ratio === "adaptation" ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconRealSizeStroked, Object.assign({}, props)) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconWindowAdaptionStroked, Object.assign({}, props));
      let content;
      if (ratio === "adaptation") {
        content = originTip !== null && originTip !== void 0 ? originTip : this.getLocalTextByKey("originTip");
      } else {
        content = adaptiveTip !== null && adaptiveTip !== void 0 ? adaptiveTip : this.getLocalTextByKey("adaptiveTip");
      }
      return this.getFinalIconElement(icon, content, 'ratio', true);
    };
    this.getIconRotate = () => {
      const {
        rotateTip
      } = this.props;
      const icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconRotate, {
        key: "rotate",
        size: "large",
        onClick: this.handleRotateLeft
      });
      const content = rotateTip !== null && rotateTip !== void 0 ? rotateTip : this.getLocalTextByKey("rotateTip");
      return this.getFinalIconElement(icon, content, 'rotate');
    };
    this.getIconDownload = () => {
      const {
        downloadTip,
        onDownload,
        disableDownload,
        showTooltip
      } = this.props;
      const icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconDownload, {
        key: 'download',
        size: "large",
        onClick: !disableDownload ? onDownload : undefined,
        className: (0, _classnames.default)({
          [`${footerPrefixCls}-gap`]: !showTooltip,
          [`${footerPrefixCls}-disabled`]: disableDownload
        })
      });
      const content = downloadTip !== null && downloadTip !== void 0 ? downloadTip : this.getLocalTextByKey("downloadTip");
      return this.getFinalIconElement(icon, content, 'download', true);
    };
    this.getNumberInfo = () => {
      const {
        curPage,
        totalNum
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${footerPrefixCls}-page`,
        key: 'info'
      }, curPage, "/", totalNum);
    };
    this.getSlider = () => {
      const {
        zoom,
        min,
        max,
        step,
        showTooltip
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_slider.default, {
        key: 'slider',
        value: zoom,
        min: min,
        max: max,
        step: step,
        tipFormatter: v => `${v}%`,
        tooltipVisible: showTooltip ? undefined : false,
        onChange: this.handleSlideChange
      });
    };
    this.getMenu = () => [this.getIconChevronLeft(), this.getNumberInfo(), this.getIconChevronRight(), this.getIconMinus(), this.getSlider(), this.getIconPlus(), this.getIconRatio(), this.getIconRotate(), this.getIconDownload()];
    this.getFooterMenu = () => {
      const menuItems = this.getMenu();
      menuItems.splice(3, 0, /*#__PURE__*/_react.default.createElement(_divider.default, {
        layout: "vertical",
        key: "divider-first"
      }));
      menuItems.splice(8, 0, /*#__PURE__*/_react.default.createElement(_divider.default, {
        layout: "vertical",
        key: "divider-second"
      }));
      return menuItems;
    };
    this.foundation = new _previewFooterFoundation.default(this.adapter);
  }
  render() {
    const {
      className,
      renderPreviewMenu,
      forwardRef
    } = this.props;
    const menuCls = (0, _classnames.default)(footerPrefixCls, `${footerPrefixCls}-wrapper`, className, {
      [`${footerPrefixCls}-content`]: !Boolean(renderPreviewMenu)
    });
    return /*#__PURE__*/_react.default.createElement("section", {
      className: menuCls,
      ref: forwardRef
    }, renderPreviewMenu ? this.customRenderViewMenu() : this.getFooterMenu());
  }
}
exports.default = Footer;
Footer.propTypes = {
  curPage: _propTypes.default.number,
  totalNum: _propTypes.default.number,
  disabledPrev: _propTypes.default.bool,
  disabledNext: _propTypes.default.bool,
  disableDownload: _propTypes.default.bool,
  className: _propTypes.default.string,
  zoom: _propTypes.default.number,
  ratio: _propTypes.default.string,
  prevTip: _propTypes.default.string,
  nextTip: _propTypes.default.string,
  zoomInTip: _propTypes.default.string,
  zoomOutTip: _propTypes.default.string,
  rotateTip: _propTypes.default.string,
  downloadTip: _propTypes.default.string,
  adaptiveTip: _propTypes.default.string,
  originTip: _propTypes.default.string,
  showTooltip: _propTypes.default.bool,
  onZoomIn: _propTypes.default.func,
  onZoomOut: _propTypes.default.func,
  onPrev: _propTypes.default.func,
  onNext: _propTypes.default.func,
  onAdjustRatio: _propTypes.default.func,
  onRotateLeft: _propTypes.default.func,
  onDownload: _propTypes.default.func
};
Footer.defaultProps = {
  min: 10,
  max: 500,
  step: 10,
  showTooltip: false,
  disableDownload: false
};