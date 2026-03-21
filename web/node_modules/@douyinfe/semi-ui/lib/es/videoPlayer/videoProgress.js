import _noop from "lodash/noop";
import React from 'react';
import cls from 'classnames';
import '@douyinfe/semi-foundation/lib/es/videoPlayer/videoPlayer.css';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/videoPlayer/constants';
import VideoProgressFoundation from '@douyinfe/semi-foundation/lib/es/videoPlayer/progressFoundation';
import Tooltip from '../tooltip';
import { formatTime } from './utils';
import BaseComponent from '../_base/baseComponent';
export default class VideoProgress extends BaseComponent {
  constructor(props) {
    super(props);
    this.initMarkerList = () => {
      const {
        markers,
        max
      } = this.props;
      const hasMarkers = markers && markers.length > 0;
      const defaultMarker = {
        start: 0,
        end: max,
        left: '0',
        title: '',
        width: '100%'
      };
      const newMarkers = hasMarkers ? [...markers] : [defaultMarker];
      let markersList = [];
      if (hasMarkers) {
        newMarkers.forEach((marker, index) => {
          const end = index === newMarkers.length - 1 ? max : newMarkers[index + 1].start;
          if (!(marker.start > max || end > max)) {
            const item = {
              left: `${marker.start / max * 100}%`,
              width: `${max ? (end - marker.start) / max * 100 : 100}%`,
              end: end,
              start: marker.start,
              title: marker.title
            };
            markersList.push(item);
          }
        });
      } else {
        markersList.push(defaultMarker);
      }
      return markersList;
    };
    this.handleMouseEnter = e => {
      this.foundation.handleMouseEvent(e, false);
    };
    this.handleMouseMove = e => {
      this.foundation.handleMouseEvent(e, true);
    };
    this.renderTooltipContent = () => {
      var _a;
      const {
        movingInfo
      } = this.state;
      if (this.markersList.length > 0 && movingInfo) {
        const hoverIndex = this.markersList.findIndex(marker => {
          return (movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.value) > marker.start && (movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.value) < marker.end;
        });
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: cls(`${cssClasses.PREFIX_PROGRESS}-tooltip-content`)
        }, (_a = this.markersList[hoverIndex]) === null || _a === void 0 ? void 0 : _a.title), /*#__PURE__*/React.createElement("div", {
          className: cls(`${cssClasses.PREFIX_PROGRESS}-tooltip-content`)
        }, formatTime(movingInfo.progress * this.props.max)));
      }
      return movingInfo && formatTime(movingInfo.progress * this.props.max);
    };
    this.state = {
      isDragging: false,
      isHandleHovering: false,
      movingInfo: null,
      activeIndex: -1 // Used to determine which slider the current handle is on under the dragging state
    };
    this.sliderRef = /*#__PURE__*/React.createRef();
    this.handleRef = /*#__PURE__*/React.createRef();
    this.markersList = this.initMarkerList();
    this.foundation = new VideoProgressFoundation(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getSliderRef: () => this.sliderRef.current,
      getMarkersList: () => this.markersList,
      setIsDragging: isDragging => this.setState({
        isDragging
      }),
      setIsHandleHovering: isHandleHovering => this.setState({
        isHandleHovering
      }),
      setActiveIndex: activeIndex => this.setState({
        activeIndex
      }),
      setMovingInfo: movingInfo => this.setState({
        movingInfo
      })
    });
  }
  render() {
    const {
      showTooltip,
      max,
      value: currentValue
    } = this.props;
    const {
      movingInfo,
      isHandleHovering,
      isDragging,
      activeIndex
    } = this.state;
    const sliderContent = /*#__PURE__*/React.createElement("div", {
      role: "slider",
      tabIndex: 0,
      "aria-valuenow": currentValue,
      ref: this.sliderRef,
      className: cls(`${cssClasses.PREFIX_PROGRESS}`),
      onMouseDown: this.foundation.handleMouseDown,
      onMouseUp: this.foundation.handleMouseUp,
      onMouseEnter: this.handleMouseEnter,
      onMouseMove: this.handleMouseMove
    }, /*#__PURE__*/React.createElement("div", {
      className: cls(`${cssClasses.PREFIX_PROGRESS}-markers`)
    }, this.markersList.map((marker, index) => (/*#__PURE__*/React.createElement("div", {
      key: `${marker.start}-${index}`,
      className: cls(`${cssClasses.PREFIX_PROGRESS}-slider`, {
        [`${cssClasses.PREFIX_PROGRESS}-slider-active`]: index === activeIndex && isDragging
      }),
      style: {
        left: marker.left,
        width: marker.width
      },
      onMouseEnter: () => this.foundation.handleSliderMouseEnter(index),
      onMouseLeave: () => this.foundation.handleSliderMouseLeave(index)
    }, /*#__PURE__*/React.createElement("div", {
      className: cls(`${cssClasses.PREFIX_PROGRESS}-slider-list`)
    }), /*#__PURE__*/React.createElement("div", {
      className: cls(`${cssClasses.PREFIX_PROGRESS}-slider-buffered`),
      style: {
        width: this.foundation.getLoadedWidth(marker)
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: cls(`${cssClasses.PREFIX_PROGRESS}-slider-played`),
      style: {
        width: this.foundation.getPlayedWidth(marker)
      }
    }))))), /*#__PURE__*/React.createElement("div", {
      ref: this.handleRef,
      className: cls(`${cssClasses.PREFIX_PROGRESS}-handle`),
      style: {
        left: `calc(${(max ? (currentValue || 1) / max : 0) * 100}% - 8px)`,
        transform: 'translateY(-50%)',
        opacity: isHandleHovering || isDragging ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none'
      }
    }));
    return showTooltip ? (/*#__PURE__*/React.createElement(Tooltip, {
      position: 'top',
      className: cls(`${cssClasses.PREFIX_PROGRESS}-tooltip`),
      content: this.renderTooltipContent(),
      style: {
        'left': movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.offset
      }
    }, sliderContent)) : sliderContent;
  }
}
VideoProgress.defaultProps = {
  value: 0,
  onChange: _noop,
  max: 100,
  showTooltip: true
};