"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AudioPlayerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, AudioPlayerFoundation), adapter));
  }
  initAudioState() {
    const audioElement = this.getAudioRef();
    const props = this.getProps();
    this.setState({
      totalTime: (audioElement === null || audioElement === void 0 ? void 0 : audioElement.duration) || 0,
      isPlaying: props.autoPlay,
      volume: (audioElement === null || audioElement === void 0 ? void 0 : audioElement.volume) * 100 || 100,
      currentRate: {
        label: '1.0x',
        value: (audioElement === null || audioElement === void 0 ? void 0 : audioElement.playbackRate) || 1
      }
    });
  }
  endHandler() {
    const props = this.getProps();
    if (Array.isArray(props.audioUrl)) {
      this.handleTrackChange('next');
    } else {
      this.setState({
        isPlaying: false
      });
    }
  }
  errorHandler() {
    this.setState({
      error: true
    });
  }
  init() {
    this._adapter.init();
  }
  destroy() {
    this._adapter.destroy();
  }
  resetAudioState() {
    this._adapter.resetAudioState();
  }
  handleStatusClick() {
    this._adapter.handleStatusClick();
  }
  handleTimeUpdate() {
    this._adapter.handleTimeUpdate();
  }
  handleTrackChange(direction) {
    this._adapter.handleTrackChange(direction);
  }
  getAudioRef() {
    return this._adapter.getAudioRef();
  }
  handleTimeChange(value) {
    this._adapter.handleTimeChange(value);
  }
  handleSpeedChange(value) {
    this._adapter.handleSpeedChange(value);
  }
  handleSeek(direction) {
    this._adapter.handleSeek(direction);
  }
  handleRefresh() {
    this._adapter.handleRefresh();
  }
  handleVolumeChange(value) {
    this._adapter.handleVolumeChange(value);
  }
}
var _default = exports.default = AudioPlayerFoundation;