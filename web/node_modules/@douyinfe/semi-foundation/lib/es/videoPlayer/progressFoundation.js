import BaseFoundation from '../base/foundation';
export default class VideoProgressFoundation extends BaseFoundation {
  constructor(adapter) {
    var _this;
    super(Object.assign({}, adapter));
    _this = this;
    this.handleDocumentMouseMove = e => {
      const {
        isDragging
      } = this.getStates();
      if (isDragging) {
        this.handleMouseEvent(e, true);
      }
    };
    this.handleDocumentMouseUp = () => {
      const {
        isDragging
      } = this.getStates();
      if (isDragging) {
        this._adapter.setIsDragging(false);
      }
      document.removeEventListener('mousemove', this.handleDocumentMouseMove);
      document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    };
    this.handleMouseDown = e => {
      this._adapter.setIsDragging(true);
      this.handleMouseEvent(e, true);
      document.addEventListener('mousemove', this.handleDocumentMouseMove);
      document.addEventListener('mouseup', this.handleDocumentMouseUp);
    };
    this.handleMouseUp = () => {
      const {
        isDragging
      } = this.getStates();
      if (isDragging) {
        this._adapter.setIsDragging(false);
      }
    };
    this.handleMouseEvent = function (e) {
      let shouldSetValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const {
        isDragging
      } = _this.getStates();
      const {
        onChange,
        max
      } = _this.getProps();
      const sliderRef = _this._adapter.getSliderRef();
      if (!sliderRef) return;
      const rect = sliderRef.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      const total = rect.width;
      const percentage = Math.min(Math.max(offset / total, 0), 1);
      const value = percentage * max;
      if (shouldSetValue && (isDragging || e.type === 'mousedown')) {
        _this.setActiveIndex(value);
        onChange(value);
      }
      _this._adapter.setMovingInfo({
        progress: percentage,
        offset: offset - rect.width / 2,
        value
      });
    };
    this.handleSliderMouseEnter = index => {
      const {
        value: currentValue
      } = this.getProps();
      const markersList = this._adapter.getMarkersList();
      const currentSlider = markersList[index];
      if (currentSlider.start < currentValue && currentSlider.end > currentValue) {
        this._adapter.setIsHandleHovering(true);
      } else {
        this._adapter.setIsHandleHovering(false);
      }
    };
    this.handleSliderMouseLeave = index => {
      const {
        value: currentValue
      } = this.getProps();
      const markersList = this._adapter.getMarkersList();
      const currentSlider = markersList[index];
      if (currentSlider.start < currentValue && currentSlider.end > currentValue) {
        this._adapter.setIsHandleHovering(false);
      }
    };
    this.setActiveIndex = currentValue => {
      const markersList = this._adapter.getMarkersList();
      markersList.map((marker, index) => {
        if (currentValue < marker.end && currentValue > marker.start) {
          this._adapter.setIsHandleHovering(true);
          this._adapter.setActiveIndex(index);
        }
      });
    };
    this.getValueWidth = (marker, value) => {
      const {
        start,
        end
      } = marker;
      if (value > end) {
        return 'calc(100% - 2px)';
      } else if (value < start) {
        return '0%';
      } else {
        return `${(value - start) / (end - start) * 100}%`;
      }
    };
    // Get the width of the video being played
    this.getPlayedWidth = marker => {
      const {
        value: currentValue
      } = this.getProps();
      return this.getValueWidth(marker, currentValue);
    };
    this.getLoadedWidth = marker => {
      const {
        bufferedValue
      } = this.getProps();
      return this.getValueWidth(marker, bufferedValue);
    };
  }
}