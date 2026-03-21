"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = exports.DEFAULT_PLAYBACK_RATE = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-videoPlayer`,
  PREFIX_CONTROLS: `${_constants.BASE_CLASS_PREFIX}-videoPlayer-controls`,
  PREFIX_PROGRESS: `${_constants.BASE_CLASS_PREFIX}-videoPlayer-progress`
};
const strings = exports.strings = {
  DARK: 'dark',
  LIGHT: 'light',
  PLAY: 'play',
  NEXT: 'next',
  TIME: 'time',
  VOLUME: 'volume',
  PLAYBACK_RATE: 'playbackRate',
  QUALITY: 'quality',
  ROUTE: 'route',
  MIRROR: 'mirror',
  FULLSCREEN: 'fullscreen',
  PICTURE_IN_PICTURE: 'pictureInPicture'
};
const numbers = exports.numbers = {
  DEFAULT_VOLUME: 100,
  DEFAULT_SEEK_TIME: 10,
  DEFAULT_VOLUME_STEP: 10,
  DEFAULT_PLAYBACK_RATE: 1
};
const DEFAULT_PLAYBACK_RATE = exports.DEFAULT_PLAYBACK_RATE = [{
  label: '2.0x',
  value: 2
}, {
  label: '1.5x',
  value: 1.5
}, {
  label: '1.25x',
  value: 1.25
}, {
  label: '1.0x',
  value: 1
}, {
  label: '0.75x',
  value: 0.75
}];