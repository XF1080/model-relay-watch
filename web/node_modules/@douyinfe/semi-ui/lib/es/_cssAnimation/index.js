import _isEqual from "lodash/isEqual";
import React from 'react';
class CSSAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnimationStart = () => {
      var _a, _b;
      (_b = (_a = this.props).onAnimationStart) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    this.handleAnimationEnd = () => {
      this.setState({
        currentClassName: this.props.endClassName,
        extraStyle: {
          animationFillMode: this.props.fillMode
        },
        isAnimating: false
      }, () => {
        var _a, _b;
        (_b = (_a = this.props).onAnimationEnd) === null || _b === void 0 ? void 0 : _b.call(_a, false);
      });
    };
    this.state = {
      currentClassName: this.props.startClassName,
      extraStyle: {
        animationFillMode: this.props.fillMode
      },
      isAnimating: true
    };
  }
  componentDidMount() {
    var _a, _b, _c, _d;
    // The purpose is to shield the impact of the presence or absence of animation on the other semi component life cycle.
    // In order to make the component side do not need to manually call the next life cycle function when there is no animation,
    // so when there is no animation , it is logically (and only logically) regarded as an animation with a duration of 0.
    (_b = (_a = this.props).onAnimationStart) === null || _b === void 0 ? void 0 : _b.call(_a);
    if (!this.props.motion) {
      (_d = (_c = this.props).onAnimationEnd) === null || _d === void 0 ? void 0 : _d.call(_c, false);
      this.setState({
        isAnimating: false
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const changedKeys = Object.keys(this.props).filter(key => !_isEqual(this.props[key], prevProps[key]));
    if (changedKeys.includes("animationState")) {}
    if (changedKeys.includes("startClassName") || changedKeys.includes('replayKey') || changedKeys.includes("motion")) {
      this.setState({
        currentClassName: this.props.startClassName,
        extraStyle: {
          animationFillMode: this.props.fillMode
        },
        isAnimating: true
      }, () => {
        var _a, _b, _c, _d;
        (_b = (_a = this.props).onAnimationStart) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (!this.props.motion) {
          (_d = (_c = this.props).onAnimationEnd) === null || _d === void 0 ? void 0 : _d.call(_c, this.state.isAnimating);
          this.setState({
            isAnimating: false
          });
        }
      });
    }
  }
  render() {
    var _a;
    if (this.props.motion) {
      return this.props.children({
        animationClassName: (_a = this.state.currentClassName) !== null && _a !== void 0 ? _a : "",
        animationStyle: this.state.extraStyle,
        animationEventsNeedBind: {
          onAnimationStart: this.handleAnimationStart,
          onAnimationEnd: this.handleAnimationEnd
        },
        isAnimating: this.state.isAnimating
      });
    } else {
      return this.props.children({
        animationClassName: "",
        animationStyle: {},
        animationEventsNeedBind: {},
        isAnimating: this.state.isAnimating
      });
    }
  }
}
CSSAnimation.defaultProps = {
  motion: true,
  replayKey: ""
};
// const mergeAnimationFunction = (eventHandleFunctions: AnimationEventsNeedBind[]) => {
//     //merge function in objects
//     const mergedFunction = {};
//     eventHandleFunctions.forEach(eventHandleFunction => {
//         Object.keys(eventHandleFunction).forEach(key => {
//             if (mergedFunction[key]) {
//                 const oldFunction = mergedFunction[key];
//                 mergedFunction[key] = (e) => {
//                     eventHandleFunction[key](e);
//                     oldFunction(e);
//                 };
//             } else {
//                 mergedFunction[key] = eventHandleFunction[key];
//             }
//         });
//     });
//     return mergedFunction;
// };
// export { mergeAnimationFunction };
export default CSSAnimation;