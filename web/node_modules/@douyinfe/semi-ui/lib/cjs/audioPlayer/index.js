"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
require("@douyinfe/semi-foundation/lib/cjs/audioPlayer/audioPlayer.css");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/audioPlayer/constants");
var _button = _interopRequireDefault(require("../button"));
var _dropdown = _interopRequireDefault(require("../dropdown"));
var _image = _interopRequireDefault(require("../image"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _popover = _interopRequireDefault(require("../popover"));
var _semiIcons = require("@douyinfe/semi-icons");
var _audioSlider = _interopRequireDefault(require("./audioSlider"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/audioPlayer/foundation"));
var _utils = require("./utils");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class AudioPlayer extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.audioRef = /*#__PURE__*/_react.default.createRef();
    this.rateOptions = [{
      label: '0.5x',
      value: 0.5
    }, {
      label: '0.75x',
      value: 0.75
    }, {
      label: '1.0x',
      value: 1
    }, {
      label: '1.5x',
      value: 1.5
    }, {
      label: '2.0x',
      value: 2
    }];
    this.handleStatusClick = () => {
      this.foundation.handleStatusClick();
    };
    this.handleTrackChange = direction => {
      this.foundation.handleTrackChange(direction);
    };
    this.handleTimeChange = value => {
      this.foundation.handleTimeChange(value);
    };
    this.handleRefresh = () => {
      this.foundation.handleRefresh();
    };
    this.handleSpeedChange = value => {
      this.foundation.handleSpeedChange(value);
    };
    this.handleSeek = direction => {
      this.foundation.handleSeek(direction);
    };
    this.handleTimeUpdate = () => {
      this.foundation.handleTimeUpdate();
    };
    this.handleVolumeChange = value => {
      this.foundation.handleVolumeChange(value);
    };
    this.handleVolumeSilent = () => {
      if (!this.audioRef.current) return;
      this.audioRef.current.volume = this.state.volume === 0 ? 0.5 : 0;
      this.setState({
        volume: this.state.volume === 0 ? 50 : 0
      });
    };
    this.getAudioInfo = audioUrl => {
      const isAudioUrlArray = Array.isArray(audioUrl);
      if (isAudioUrlArray) {
        const audioInfo = audioUrl[this.state.currentIndex];
        if (typeof audioInfo === 'string') {
          return {
            src: audioInfo,
            audioTitle: null,
            audioCover: null
          };
        } else {
          return {
            src: audioInfo.src,
            audioTitle: audioInfo.title,
            audioCover: audioInfo.cover
          };
        }
      } else if (typeof audioUrl === 'string') {
        return {
          src: audioUrl,
          audioTitle: null,
          audioCover: null
        };
      } else {
        return {
          src: audioUrl.src,
          audioTitle: audioUrl.title,
          audioCover: audioUrl.cover
        };
      }
    };
    this.renderControl = () => {
      const {
        error
      } = this.state;
      const isAudioUrlArray = Array.isArray(this.props.audioUrl);
      const iconClass = (0, _classnames.default)(`${prefixCls}-control-button-icon`);
      const circleStyle = {
        borderRadius: '50%'
      };
      const transparentStyle = {
        background: 'transparent'
      };
      const playStyle = {
        marginLeft: '1px'
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-control`)
      }, isAudioUrlArray && /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: locale.prev,
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_button.default, {
        style: Object.assign(Object.assign({}, circleStyle), transparentStyle),
        size: 'large',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconRestart, {
          size: 'large',
          className: iconClass
        }),
        onClick: () => this.handleTrackChange('prev')
      }))))), /*#__PURE__*/_react.default.createElement(_button.default, {
        style: circleStyle,
        size: 'large',
        disabled: error,
        onClick: this.handleStatusClick,
        icon: this.state.isPlaying ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconPause, {
          size: 'large'
        }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconPlay, {
          style: playStyle,
          size: 'large'
        }),
        className: (0, _classnames.default)(`${_constants.cssClasses.PREFIX}-control-button-play`, {
          [`${_constants.cssClasses.PREFIX}-control-button-play-disabled`]: error
        })
      }), isAudioUrlArray && /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: locale.next,
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_button.default, {
        style: Object.assign(Object.assign({}, circleStyle), transparentStyle),
        size: 'large',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconRestart, {
          size: 'large',
          rotate: 180,
          className: iconClass
        }),
        onClick: () => this.handleTrackChange('next')
      }))))));
    };
    this.renderInfo = () => {
      const {
        audioTitle,
        audioCover
      } = this.getAudioInfo(this.props.audioUrl);
      const {
        theme
      } = this.props;
      const {
        currentTime,
        totalTime,
        error
      } = this.state;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-info-container`)
      }, audioCover && /*#__PURE__*/_react.default.createElement(_image.default, {
        src: audioCover,
        width: 50,
        height: 50
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-info`)
      }, audioTitle && /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-info-title`)
      }, audioTitle, error && this.renderError()), !error && /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-info-time`)
      }, /*#__PURE__*/_react.default.createElement("span", {
        style: {
          width: '38px'
        }
      }, (0, _utils.formatTime)(currentTime)), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-slider-container`)
      }, /*#__PURE__*/_react.default.createElement(_audioSlider.default, {
        value: currentTime,
        max: totalTime,
        theme: theme,
        onChange: this.handleTimeChange
      })), /*#__PURE__*/_react.default.createElement("span", {
        style: {
          width: '38px'
        }
      }, (0, _utils.formatTime)(totalTime)))));
    };
    this.renderToolbar = () => {
      const {
        volume,
        error
      } = this.state;
      const {
        skipDuration = 10,
        theme = 'dark'
      } = this.props;
      const iconClass = (0, _classnames.default)(`${prefixCls}-control-button-icon`);
      const transparentStyle = {
        background: 'transparent'
      };
      const isVolumeSilent = volume === 0;
      return !error ? (/*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-control`)
      }, /*#__PURE__*/_react.default.createElement(_popover.default, {
        autoAdjustOverflow: true,
        content: /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(`${prefixCls}-control-volume`)
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(`${prefixCls}-control-volume-title`)
        }, volume, "%"), /*#__PURE__*/_react.default.createElement(_audioSlider.default, {
          value: volume,
          max: 100,
          vertical: true,
          height: 120,
          theme: theme,
          showTooltip: false,
          onChange: this.handleVolumeChange
        }))
      }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: locale.volume,
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        style: transparentStyle,
        icon: !isVolumeSilent ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconVolume2, {
          className: iconClass
        }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconVolumnSilent, {
          className: iconClass
        }),
        onClick: this.handleVolumeSilent
      })))))), /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: locale.backward.replace('${skipDuration}', String(skipDuration)),
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_button.default, {
        style: transparentStyle,
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconBackward, {
          className: iconClass
        }),
        onClick: () => this.handleSeek(-1)
      }))))), /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: locale.forward.replace('${skipDuration}', String(skipDuration)),
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_button.default, {
        style: transparentStyle,
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconFastForward, {
          className: iconClass
        }),
        onClick: () => this.handleSeek(1)
      }))))), /*#__PURE__*/_react.default.createElement(_dropdown.default, {
        className: (0, _classnames.default)(`${prefixCls}-control-speed-menu`),
        render: /*#__PURE__*/_react.default.createElement(_dropdown.default.Menu, null, this.rateOptions.map(option => (/*#__PURE__*/_react.default.createElement(_dropdown.default.Item, {
          className: (0, _classnames.default)(`${prefixCls}-control-speed-menu-item`),
          key: option.value,
          onClick: () => this.handleSpeedChange(option),
          active: option.value === this.state.currentRate.value
        }, option.label)))),
        onChange: this.handleSpeedChange
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-control-speed`)
      }, /*#__PURE__*/_react.default.createElement("span", null, this.state.currentRate.label))), /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: () => this.handleRefresh(),
        style: transparentStyle,
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconRefresh, {
          style: {
            transform: 'rotateY(180deg)'
          },
          className: iconClass
        })
      }))) : (/*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-control`)
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: () => this.handleRefresh(),
        style: transparentStyle,
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconRefresh, {
          style: {
            transform: 'rotateY(180deg)'
          },
          className: iconClass
        })
      })));
    };
    this.renderError = () => /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${prefixCls}-error`)
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, {
      size: 'large'
    }), "\u97F3\u9891\u52A0\u8F7D\u5931\u8D25");
    this.state = {
      isPlaying: false,
      currentIndex: 0,
      totalTime: 0,
      currentTime: 0,
      currentRate: {
        label: '1.0x',
        value: 1
      },
      volume: 100,
      error: false
    };
    this.audioRef = /*#__PURE__*/_react.default.createRef();
    this.foundation = new _foundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      init: () => {
        if (this.audioRef.current) {
          this.audioRef.current.addEventListener('loadedmetadata', () => {
            this.foundation.initAudioState();
          });
          this.audioRef.current.addEventListener('error', () => {
            this.foundation.errorHandler();
          });
          this.audioRef.current.addEventListener('ended', () => {
            this.foundation.endHandler();
          });
        }
      },
      destroy: () => {
        if (this.audioRef.current) {
          this.audioRef.current.removeEventListener('loadedmetadata', () => {
            this.foundation.initAudioState();
          });
          this.audioRef.current.removeEventListener('error', () => {
            this.foundation.errorHandler();
          });
          this.audioRef.current.removeEventListener('ended', () => {
            this.foundation.endHandler();
          });
        }
      },
      handleStatusClick: () => {
        if (!this.audioRef.current) return;
        if (this.state.isPlaying) {
          this.audioRef.current.pause();
        } else {
          this.audioRef.current.play();
        }
        this.setState({
          isPlaying: !this.state.isPlaying
        });
      },
      getAudioRef: () => this.audioRef.current,
      resetAudioState: () => {
        this.setState({
          isPlaying: true,
          currentTime: 0,
          currentRate: {
            label: '1.0x',
            value: 1
          }
        }, () => {
          if (this.audioRef.current) {
            this.audioRef.current.currentTime = this.state.currentTime;
            this.audioRef.current.playbackRate = this.state.currentRate.value;
            this.audioRef.current.play();
          }
        });
      },
      handleTimeUpdate: () => {
        if (!this.audioRef.current) return;
        this.setState({
          currentTime: this.audioRef.current.currentTime
        });
      },
      handleTrackChange: direction => {
        if (!this.audioRef.current) return;
        const {
          audioUrl
        } = this.props;
        const isAudioUrlArray = Array.isArray(audioUrl);
        if (isAudioUrlArray) {
          if (direction === 'next') {
            this.setState({
              currentIndex: (this.state.currentIndex + 1) % audioUrl.length,
              error: false
            });
          } else {
            this.setState({
              currentIndex: (this.state.currentIndex - 1 + audioUrl.length) % audioUrl.length,
              error: false
            });
          }
        }
        this.foundation.resetAudioState();
      },
      handleTimeChange: value => {
        if (!this.audioRef.current) return;
        this.audioRef.current.currentTime = value;
        this.setState({
          currentTime: value
        });
      },
      handleRefresh: () => {
        if (!this.audioRef.current) return;
        if (this.state.error) {
          this.audioRef.current.load();
        } else {
          this.audioRef.current.currentTime = 0;
          this.setState({
            currentTime: 0
          });
        }
      },
      handleSpeedChange: value => {
        if (!this.audioRef.current) return;
        this.audioRef.current.playbackRate = value.value;
        this.setState({
          currentRate: value
        });
      },
      handleSeek: direction => {
        if (!this.audioRef.current) return;
        const {
          skipDuration = 10
        } = this.props;
        const newTime = Math.min(Math.max(this.audioRef.current.currentTime + direction * skipDuration, 0), this.audioRef.current.duration);
        this.audioRef.current.currentTime = newTime;
      },
      handleVolumeChange: value => {
        if (!this.audioRef.current) return;
        const volume = Math.floor(value);
        this.audioRef.current.volume = volume / 100;
        this.setState({
          volume: volume
        });
      }
    });
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const {
      audioUrl,
      autoPlay,
      className,
      style,
      showToolbar = true,
      theme = 'dark'
    } = this.props;
    const src = this.getAudioInfo(audioUrl).src;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, className, `${prefixCls}-${theme}`),
      style: style
    }, /*#__PURE__*/_react.default.createElement("audio", {
      src: src,
      autoPlay: autoPlay,
      className: (0, _classnames.default)(prefixCls, className),
      style: style,
      ref: this.audioRef,
      onTimeUpdate: this.handleTimeUpdate
    }, /*#__PURE__*/_react.default.createElement("track", {
      kind: "captions",
      src: src
    })), this.renderControl(), this.renderInfo(), showToolbar && this.renderToolbar());
  }
}
AudioPlayer.defaultProps = {
  autoPlay: false,
  showToolbar: true,
  skipDuration: 10,
  theme: 'dark'
};
var _default = exports.default = AudioPlayer;