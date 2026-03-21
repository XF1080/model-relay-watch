import _throttle from "lodash/throttle";
import React from "react";
import BaseComponent from "../_base/baseComponent";
import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus, IconRotate, IconDownload, IconWindowAdaptionStroked, IconRealSizeStroked } from "@douyinfe/semi-icons";
import PropTypes from "prop-types";
import Tooltip from "../tooltip";
import Divider from "../divider";
import Slider from "../slider";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/image/constants';
import cls from "classnames";
import PreviewFooterFoundation from '@douyinfe/semi-foundation/lib/es/image/previewFooterFoundation';
import LocaleConsumer from "../locale/localeConsumer";
const prefixCls = cssClasses.PREFIX;
const footerPrefixCls = `${cssClasses.PREFIX}-preview-footer`;
export default class Footer extends BaseComponent {
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
    this.handleSlideChange = _throttle(value => {
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
      return showTooltip ? (/*#__PURE__*/React.createElement(Tooltip, {
        content: content,
        key: `tooltip-${key}`,
        zIndex: zIndex + 1
      }, /*#__PURE__*/React.createElement("span", {
        className: cls(`${prefixCls}-tooltip-children-wrapper`, {
          [`${footerPrefixCls}-gap`]: gap
        })
      }, element))) : element;
    };
    this.getLocalTextByKey = key => (/*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Image"
    }, locale => locale[key]));
    this.getIconChevronLeft = () => {
      const {
        disabledPrev,
        onPrev,
        prevTip
      } = this.props;
      const icon = /*#__PURE__*/React.createElement(IconChevronLeft, {
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
      const icon = /*#__PURE__*/React.createElement(IconChevronRight, {
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
      const icon = /*#__PURE__*/React.createElement(IconMinus, {
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
      const icon = /*#__PURE__*/React.createElement(IconPlus, {
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
      const icon = ratio === "adaptation" ? /*#__PURE__*/React.createElement(IconRealSizeStroked, Object.assign({}, props)) : /*#__PURE__*/React.createElement(IconWindowAdaptionStroked, Object.assign({}, props));
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
      const icon = /*#__PURE__*/React.createElement(IconRotate, {
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
      const icon = /*#__PURE__*/React.createElement(IconDownload, {
        key: 'download',
        size: "large",
        onClick: !disableDownload ? onDownload : undefined,
        className: cls({
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
      return /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement(Slider, {
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
      menuItems.splice(3, 0, /*#__PURE__*/React.createElement(Divider, {
        layout: "vertical",
        key: "divider-first"
      }));
      menuItems.splice(8, 0, /*#__PURE__*/React.createElement(Divider, {
        layout: "vertical",
        key: "divider-second"
      }));
      return menuItems;
    };
    this.foundation = new PreviewFooterFoundation(this.adapter);
  }
  render() {
    const {
      className,
      renderPreviewMenu,
      forwardRef
    } = this.props;
    const menuCls = cls(footerPrefixCls, `${footerPrefixCls}-wrapper`, className, {
      [`${footerPrefixCls}-content`]: !Boolean(renderPreviewMenu)
    });
    return /*#__PURE__*/React.createElement("section", {
      className: menuCls,
      ref: forwardRef
    }, renderPreviewMenu ? this.customRenderViewMenu() : this.getFooterMenu());
  }
}
Footer.propTypes = {
  curPage: PropTypes.number,
  totalNum: PropTypes.number,
  disabledPrev: PropTypes.bool,
  disabledNext: PropTypes.bool,
  disableDownload: PropTypes.bool,
  className: PropTypes.string,
  zoom: PropTypes.number,
  ratio: PropTypes.string,
  prevTip: PropTypes.string,
  nextTip: PropTypes.string,
  zoomInTip: PropTypes.string,
  zoomOutTip: PropTypes.string,
  rotateTip: PropTypes.string,
  downloadTip: PropTypes.string,
  adaptiveTip: PropTypes.string,
  originTip: PropTypes.string,
  showTooltip: PropTypes.bool,
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onAdjustRatio: PropTypes.func,
  onRotateLeft: PropTypes.func,
  onDownload: PropTypes.func
};
Footer.defaultProps = {
  min: 10,
  max: 500,
  step: 10,
  showTooltip: false,
  disableDownload: false
};