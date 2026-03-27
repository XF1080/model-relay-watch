import BaseComponent from '../_base/baseComponent';
import React from 'react';
import cls from 'classnames';
import '@douyinfe/semi-foundation/lib/es/audioPlayer/audioPlayer.css';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/audioPlayer/constants';
import Button from '../button';
import Dropdown from '../dropdown';
import Image from '../image';
import Tooltip from '../tooltip';
import Popover from '../popover';
import { IconAlertCircle, IconBackward, IconFastForward, IconPause, IconPlay, IconRefresh, IconRestart, IconVolume2, IconVolumnSilent } from '@douyinfe/semi-icons';
import AudioSlider from './audioSlider';
import AudioPlayerFoundation from '@douyinfe/semi-foundation/lib/es/audioPlayer/foundation';
import { formatTime } from './utils';
import LocaleConsumer from '../locale/localeConsumer';
const prefixCls = cssClasses.PREFIX;
class AudioPlayer extends BaseComponent {
  constructor(props) {
    super(props);
    this.audioRef = /*#__PURE__*/React.createRef();
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
      const iconClass = cls(`${prefixCls}-control-button-icon`);
      const circleStyle = {
        borderRadius: '50%'
      };
      const transparentStyle = {
        background: 'transparent'
      };
      const playStyle = {
        marginLeft: '1px'
      };
      return /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-control`)
      }, isAudioUrlArray && /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/React.createElement(Tooltip, {
        content: locale.prev,
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Button, {
        style: Object.assign(Object.assign({}, circleStyle), transparentStyle),
        size: 'large',
        icon: /*#__PURE__*/React.createElement(IconRestart, {
          size: 'large',
          className: iconClass
        }),
        onClick: () => this.handleTrackChange('prev')
      }))))), /*#__PURE__*/React.createElement(Button, {
        style: circleStyle,
        size: 'large',
        disabled: error,
        onClick: this.handleStatusClick,
        icon: this.state.isPlaying ? /*#__PURE__*/React.createElement(IconPause, {
          size: 'large'
        }) : /*#__PURE__*/React.createElement(IconPlay, {
          style: playStyle,
          size: 'large'
        }),
        className: cls(`${cssClasses.PREFIX}-control-button-play`, {
          [`${cssClasses.PREFIX}-control-button-play-disabled`]: error
        })
      }), isAudioUrlArray && /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/React.createElement(Tooltip, {
        content: locale.next,
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Button, {
        style: Object.assign(Object.assign({}, circleStyle), transparentStyle),
        size: 'large',
        icon: /*#__PURE__*/React.createElement(IconRestart, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-info-container`)
      }, audioCover && /*#__PURE__*/React.createElement(Image, {
        src: audioCover,
        width: 50,
        height: 50
      }), /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-info`)
      }, audioTitle && /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-info-title`)
      }, audioTitle, error && this.renderError()), !error && /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-info-time`)
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: '38px'
        }
      }, formatTime(currentTime)), /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-slider-container`)
      }, /*#__PURE__*/React.createElement(AudioSlider, {
        value: currentTime,
        max: totalTime,
        theme: theme,
        onChange: this.handleTimeChange
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          width: '38px'
        }
      }, formatTime(totalTime)))));
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
      const iconClass = cls(`${prefixCls}-control-button-icon`);
      const transparentStyle = {
        background: 'transparent'
      };
      const isVolumeSilent = volume === 0;
      return !error ? (/*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-control`)
      }, /*#__PURE__*/React.createElement(Popover, {
        autoAdjustOverflow: true,
        content: /*#__PURE__*/React.createElement("div", {
          className: cls(`${prefixCls}-control-volume`)
        }, /*#__PURE__*/React.createElement("div", {
          className: cls(`${prefixCls}-control-volume-title`)
        }, volume, "%"), /*#__PURE__*/React.createElement(AudioSlider, {
          value: volume,
          max: 100,
          vertical: true,
          height: 120,
          theme: theme,
          showTooltip: false,
          onChange: this.handleVolumeChange
        }))
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/React.createElement(Tooltip, {
        content: locale.volume,
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/React.createElement(Button, {
        style: transparentStyle,
        icon: !isVolumeSilent ? /*#__PURE__*/React.createElement(IconVolume2, {
          className: iconClass
        }) : /*#__PURE__*/React.createElement(IconVolumnSilent, {
          className: iconClass
        }),
        onClick: this.handleVolumeSilent
      })))))), /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/React.createElement(Tooltip, {
        content: locale.backward.replace('${skipDuration}', String(skipDuration)),
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Button, {
        style: transparentStyle,
        icon: /*#__PURE__*/React.createElement(IconBackward, {
          className: iconClass
        }),
        onClick: () => this.handleSeek(-1)
      }))))), /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "AudioPlayer"
      }, locale => (/*#__PURE__*/React.createElement(Tooltip, {
        content: locale.forward.replace('${skipDuration}', String(skipDuration)),
        autoAdjustOverflow: true,
        showArrow: false
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Button, {
        style: transparentStyle,
        icon: /*#__PURE__*/React.createElement(IconFastForward, {
          className: iconClass
        }),
        onClick: () => this.handleSeek(1)
      }))))), /*#__PURE__*/React.createElement(Dropdown, {
        className: cls(`${prefixCls}-control-speed-menu`),
        render: /*#__PURE__*/React.createElement(Dropdown.Menu, null, this.rateOptions.map(option => (/*#__PURE__*/React.createElement(Dropdown.Item, {
          className: cls(`${prefixCls}-control-speed-menu-item`),
          key: option.value,
          onClick: () => this.handleSpeedChange(option),
          active: option.value === this.state.currentRate.value
        }, option.label)))),
        onChange: this.handleSpeedChange
      }, /*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-control-speed`)
      }, /*#__PURE__*/React.createElement("span", null, this.state.currentRate.label))), /*#__PURE__*/React.createElement(Button, {
        onClick: () => this.handleRefresh(),
        style: transparentStyle,
        icon: /*#__PURE__*/React.createElement(IconRefresh, {
          style: {
            transform: 'rotateY(180deg)'
          },
          className: iconClass
        })
      }))) : (/*#__PURE__*/React.createElement("div", {
        className: cls(`${prefixCls}-control`)
      }, /*#__PURE__*/React.createElement(Button, {
        onClick: () => this.handleRefresh(),
        style: transparentStyle,
        icon: /*#__PURE__*/React.createElement(IconRefresh, {
          style: {
            transform: 'rotateY(180deg)'
          },
          className: iconClass
        })
      })));
    };
    this.renderError = () => /*#__PURE__*/React.createElement("div", {
      className: cls(`${prefixCls}-error`)
    }, /*#__PURE__*/React.createElement(IconAlertCircle, {
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
    this.audioRef = /*#__PURE__*/React.createRef();
    this.foundation = new AudioPlayerFoundation(this.adapter);
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
    return /*#__PURE__*/React.createElement("div", {
      className: cls(prefixCls, className, `${prefixCls}-${theme}`),
      style: style
    }, /*#__PURE__*/React.createElement("audio", {
      src: src,
      autoPlay: autoPlay,
      className: cls(prefixCls, className),
      style: style,
      ref: this.audioRef,
      onTimeUpdate: this.handleTimeUpdate
    }, /*#__PURE__*/React.createElement("track", {
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
export default AudioPlayer;