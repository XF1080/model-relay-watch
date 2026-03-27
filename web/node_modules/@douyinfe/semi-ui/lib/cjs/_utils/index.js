"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneDeep = cloneDeep;
exports.getActiveElement = getActiveElement;
exports.getDefaultPropsFromGlobalConfig = getDefaultPropsFromGlobalConfig;
exports.getFocusableElements = getFocusableElements;
exports.getScrollbarWidth = getScrollbarWidth;
exports.isNodeContainsFocus = isNodeContainsFocus;
exports.registerMediaQuery = exports.isSemiIcon = void 0;
exports.runAfterTicks = runAfterTicks;
exports.stopPropagation = stopPropagation;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _set2 = _interopRequireDefault(require("lodash/set"));
var _cloneDeepWith2 = _interopRequireDefault(require("lodash/cloneDeepWith"));
var _react = _interopRequireDefault(require("react"));
var _warning = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/warning"));
var _dom = require("@douyinfe/semi-foundation/lib/cjs/utils/dom");
var _semiGlobal = _interopRequireDefault(require("./semi-global"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/**
 * stop propagation
 *
 * @param {React.MouseEvent<HTMLElement>} e React mouse event object
 * @param {boolean} noImmediate Skip stopping immediate propagation
 */
function stopPropagation(e, noImmediate) {
  if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
  if (!noImmediate && e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
    e.nativeEvent.stopImmediatePropagation();
  }
}
function cloneDeep(value, customizer) {
  return (0, _cloneDeepWith2.default)(value, v => {
    if (typeof customizer === 'function') {
      return customizer(v);
    }
    if (typeof v === 'function' || /*#__PURE__*/_react.default.isValidElement(v)) {
      return v;
    }
    if (Object.prototype.toString.call(v) === '[object Error]') {
      return v;
    }
    // it is tricky
    // when array length beyond max length, array.length will be 0
    if (Array.isArray(v) && v.length === 0) {
      const keys = Object.keys(v);
      if (keys.length) {
        const newArray = [];
        keys.forEach(key => {
          (0, _set2.default)(newArray, key, v[key]);
        });
        // internal-issues:887
        try {
          (0, _warning.default)((0, _get2.default)(process, 'env.NODE_ENV') !== 'production', `[Semi] You may use an out-of-bounds array. In some cases, your program may not behave as expected.
                    The maximum length of an array is 4294967295.
                    Please check whether the array subscript in your data exceeds the maximum value of the JS array subscript`);
        } catch (e) {}
        return newArray;
      } else {
        return undefined;
      }
    }
    return undefined;
  });
}
/**
 * register matchFn and unMatchFn callback while media query
 * @param {string} media media string
 * @param {object} param param object
 * @returns function
 */
const registerMediaQuery = (media, _ref) => {
  let {
    match,
    unmatch,
    callInInit = true
  } = _ref;
  if (typeof window !== 'undefined') {
    const mediaQueryList = window.matchMedia(media);
    function handlerMediaChange(e) {
      if (e.matches) {
        match && match(e);
      } else {
        unmatch && unmatch(e);
      }
    }
    callInInit && handlerMediaChange(mediaQueryList);
    if (Object.prototype.hasOwnProperty.call(mediaQueryList, 'addEventListener')) {
      mediaQueryList.addEventListener('change', handlerMediaChange);
      return () => mediaQueryList.removeEventListener('change', handlerMediaChange);
    }
    mediaQueryList.addListener(handlerMediaChange);
    return () => mediaQueryList.removeListener(handlerMediaChange);
  }
  return () => undefined;
};
/**
 * Determine whether the incoming element is a built-in icon
 * @param icon 元素
 * @returns boolean
 */
exports.registerMediaQuery = registerMediaQuery;
const isSemiIcon = icon => /*#__PURE__*/_react.default.isValidElement(icon) && (0, _get2.default)(icon.type, 'elementType') === 'Icon';
exports.isSemiIcon = isSemiIcon;
function getActiveElement() {
  return document ? document.activeElement : null;
}
function isNodeContainsFocus(node) {
  const activeElement = getActiveElement();
  return activeElement === node || node.contains(activeElement);
}
function getFocusableElements(node) {
  if (!(0, _dom.isHTMLElement)(node)) {
    return [];
  }
  const focusableSelectorsList = ["input:not([disabled]):not([tabindex='-1'])", "textarea:not([disabled]):not([tabindex='-1'])", "button:not([disabled]):not([tabindex='-1'])", "a[href]:not([tabindex='-1'])", "select:not([disabled]):not([tabindex='-1'])", "area[href]:not([tabindex='-1'])", "iframe:not([tabindex='-1'])", "object:not([tabindex='-1'])", "*[tabindex]:not([tabindex='-1'])", "*[contenteditable]:not([tabindex='-1'])"];
  const focusableSelectorsStr = focusableSelectorsList.join(',');
  // we are not filtered elements which are invisible
  const focusableElements = Array.from(node.querySelectorAll(focusableSelectorsStr));
  return focusableElements;
}
function runAfterTicks(func, numberOfTicks) {
  return __awaiter(this, void 0, void 0, function* () {
    if (numberOfTicks === 0) {
      yield func();
      return;
    } else {
      yield new Promise(resolve => {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
          yield runAfterTicks(func, numberOfTicks - 1);
          resolve();
        }), 0);
      });
      return;
    }
  });
}
function getScrollbarWidth() {
  if (globalThis && Object.prototype.toString.call(globalThis) === '[object Window]') {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  return 0;
}
function getDefaultPropsFromGlobalConfig(componentName) {
  let semiDefaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const getFromGlobalConfig = () => {
    var _a, _b;
    return ((_b = (_a = _semiGlobal.default === null || _semiGlobal.default === void 0 ? void 0 : _semiGlobal.default.config) === null || _a === void 0 ? void 0 : _a.overrideDefaultProps) === null || _b === void 0 ? void 0 : _b[componentName]) || {};
  };
  return new Proxy(Object.assign({}, semiDefaultProps), {
    get(target, key, receiver) {
      const defaultPropsFromGlobal = getFromGlobalConfig();
      if (key in defaultPropsFromGlobal) {
        return defaultPropsFromGlobal[key];
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver);
    },
    ownKeys() {
      const defaultPropsFromGlobal = getFromGlobalConfig();
      return Array.from(new Set([...Reflect.ownKeys(semiDefaultProps), ...Object.keys(defaultPropsFromGlobal)]));
    },
    getOwnPropertyDescriptor(target, key) {
      const defaultPropsFromGlobal = getFromGlobalConfig();
      if (key in defaultPropsFromGlobal) {
        return Reflect.getOwnPropertyDescriptor(defaultPropsFromGlobal, key);
      } else {
        return Reflect.getOwnPropertyDescriptor(target, key);
      }
    }
  });
}