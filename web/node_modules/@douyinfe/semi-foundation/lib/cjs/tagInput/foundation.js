"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _keyCode = _interopRequireDefault(require("../utils/keyCode"));
var _getSplitedArray = _interopRequireDefault(require("./utils/getSplitedArray"));
var _isEnterPress = _interopRequireDefault(require("../utils/isEnterPress"));
var _arrayMove = _interopRequireDefault(require("../utils/arrayMove"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TagInputFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    /**
     * handler of input change
     */
    this.handleInputChange = e => {
      const {
        value
      } = e.target;
      const {
        entering
      } = this.getStates();
      if (entering) {
        // 如果处于输入法输入中，则先不检查输入是否有效，直接更新到inputValue，
        // 因为对于输入法输入中而言，此时更新到 inputValue 的不是最后的结果，比如对于中文，此时 inputValue 中的内容是拼音
        // 当输入法输入结束后，将在 handleInputCompositionEnd 中判断输入是否有效，处理结果
        // If it is composition session, it does not check whether the input is valid, and directly updates to inputValue,
        // Because for composition input, what is updated to inputValue at this time is not the final result.
        // For example, for Chinese, the content in inputValue is pinyin at this time
        // When the composition input is finished, it will be judged whether the input is valid in handleInputCompositionEnd and the result will be processed
        this._onInputChange(value, e);
      } else {
        this._checkInputChangeValid(value) && this._onInputChange(value, e);
      }
    };
    this.handleInputCompositionStart = e => {
      const {
        maxLength
      } = this.getProps();
      if (!(0, _isNumber2.default)(maxLength)) {
        return;
      }
      this._adapter.setEntering(true);
    };
    this._splitArray = (originString, separators) => {
      const {
        split
      } = this.getProps();
      if ((0, _isFunction2.default)(split)) {
        return split(originString, separators);
      }
      return (0, _getSplitedArray.default)(originString, separators);
    };
    this.handleInputCompositionEnd = e => {
      const {
        value
      } = e.target;
      const {
        maxLength,
        onInputExceed,
        separator
      } = this.getProps();
      if (!(0, _isNumber2.default)(maxLength)) {
        return;
      }
      this._adapter.setEntering(false);
      let allowChange = true;
      const inputArr = this._splitArray(value, separator);
      let index = 0;
      for (; index < inputArr.length; index++) {
        if (inputArr[index].length > maxLength) {
          allowChange = false;
          (0, _isFunction2.default)(onInputExceed) && onInputExceed(value);
          break;
        }
      }
      if (!allowChange) {
        const newInputArr = inputArr.slice(0, index);
        if (index < inputArr.length) {
          newInputArr.push(inputArr[index].slice(0, maxLength));
        }
        this._adapter.setInputValue(newInputArr.join(separator));
      } else {
        // Why does it need to be updated here instead of in onChange when the value meets the maxLength limit?
        // Because in firefox, the state change in InputCompositionEnd causes onChange to not be triggered after 
        // the composition input completes input.
        this._adapter.setInputValue(value);
      }
    };
    /**
     * check whether the input change is legal
     */
    this._checkInputChangeValid = value => {
      // e.target.value legitimacy judgment needs to be based on this.state.input Value
      const {
        maxLength,
        onInputExceed,
        separator
      } = this._adapter.getProps();
      const {
        inputValue
      } = this._adapter.getStates();
      let allowChange = true;
      if ((0, _isNumber2.default)(maxLength)) {
        const valueArr = this._splitArray(value, separator);
        const inputArr = this._splitArray(inputValue, separator);
        const maxLen = Math.max(valueArr.length, inputArr.length);
        for (let i = 0; i < maxLen; i++) {
          // When the input length is increasing
          if (!(0, _isUndefined2.default)(valueArr[i]) && ((0, _isUndefined2.default)(inputArr[i]) || valueArr[i].length > inputArr[i].length)) {
            // When the input length exceeds maxLength
            if (valueArr[i].length > maxLength) {
              allowChange = false;
              (0, _isFunction2.default)(onInputExceed) && onInputExceed(value);
              break;
            }
          }
        }
      }
      return allowChange;
    };
    /**
     * Input event handler when onKeyDown is triggered
     */
    this.handleKeyDown = e => {
      const {
        inputValue,
        tagsArray
      } = this._adapter.getStates();
      const code = e.keyCode;
      if (code === _keyCode.default.ENTER) {
        e.preventDefault(); // prevent trigger submit when using in form
        if (inputValue !== '') {
          this._handleAddTags(e);
        }
      }
      const {
        length
      } = tagsArray;
      if (code === _keyCode.default.BACKSPACE && inputValue === '' && length > 0) {
        const newTagList = tagsArray.slice(0, length - 1);
        const removedTag = tagsArray[length - 1];
        this._onRemove(newTagList, removedTag, length - 1);
      }
      this._adapter.notifyKeyDown(e);
    };
  }
  _handleAddTags(e) {
    const {
      separator,
      max,
      onExceed,
      allowDuplicates
    } = this._adapter.getProps();
    const {
      inputValue,
      tagsArray
    } = this._adapter.getStates();
    let addTags = this._splitArray(inputValue, separator);
    addTags = addTags.filter((item, idx) => {
      // If allowDuplicates is false, then filter duplicates
      if (!allowDuplicates) {
        if (tagsArray.includes(item) || addTags.indexOf(item) !== idx) {
          return false;
        }
      }
      // Filter empty strings and pure space strings in new items
      return (0, _isString2.default)(item) && item.trim() !== '';
    });
    let newTagList = tagsArray.concat(addTags);
    if ((0, _isNumber2.default)(max) && newTagList.length > max) {
      (0, _isFunction2.default)(onExceed) && onExceed(newTagList);
      newTagList = newTagList.slice(0, max);
      addTags = addTags.slice(0, max - tagsArray.length);
    }
    if (addTags.length > 0) {
      this._onAdd(newTagList, addTags);
    }
    this._onInputChange('', e);
  }
  handleInputBlur(e) {
    const {
      addOnBlur
    } = this._adapter.getProps();
    if (addOnBlur === true) {
      this._handleAddTags(e);
    }
    this._adapter.setFocusing(false);
    this._adapter.notifyBlur(e);
  }
  handleInputFocus(e) {
    this._adapter.setFocusing(true);
    this._adapter.notifyFocus(e);
  }
  /**
   * A11y: simulate clear button click
   */
  /* istanbul ignore next */
  handleClearEnterPress(e) {
    if ((0, _isEnterPress.default)(e)) {
      this.handleClearBtn(e);
    }
  }
  handleClearBtn(e) {
    const {
      inputValue,
      tagsArray
    } = this._adapter.getStates();
    if (tagsArray.length > 0) {
      this._adapter.setTagsArray([]);
      this._adapter.notifyTagChange([]);
    }
    if (inputValue.length > 0) {
      this._onInputChange('', e);
    }
    // Prevent event propagate to TagInput outermost div
    e.stopPropagation();
  }
  handleTagClose(index) {
    const {
      tagsArray
    } = this._adapter.getStates();
    const newTagList = [...tagsArray];
    newTagList.splice(index, 1);
    const removedTag = tagsArray[index];
    this._onRemove(newTagList, removedTag, index);
  }
  handleInputMouseEnter() {
    this._adapter.setHovering(true);
  }
  handleInputMouseLeave() {
    this._adapter.setHovering(false);
  }
  handleClick(e) {
    const {
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    const clickOutsideHandler = this._adapter.getClickOutsideHandler();
    if (!clickOutsideHandler) {
      this._adapter.setActive(true);
      this._adapter.registerClickOutsideHandler(e => this.clickOutsideCallBack());
    }
  }
  clickOutsideCallBack() {
    this._adapter.unregisterClickOutsideHandler();
    this._adapter.setActive(false);
  }
  handleClickPrefixOrSuffix(e) {
    const {
      disabled
    } = this._adapter.getProps();
    const {
      isFocus
    } = this._adapter.getStates();
    if (!disabled && !isFocus) {
      this._adapter.toggleFocusing(true);
    }
  }
  handlePreventMouseDown(e) {
    if (e && (0, _isFunction2.default)(e.preventDefault)) {
      e.preventDefault();
    }
  }
  /**
   * handler of delete tag
   */
  _onRemove(newTagList, removedTags, index) {
    if (!this._isControlledComponent()) {
      this._adapter.setTagsArray(newTagList);
    }
    this._adapter.notifyTagChange(newTagList);
    this._adapter.notifyTagRemove(removedTags, index);
  }
  /**
   * handler of add tag
   */
  _onAdd(newTagList, addTags) {
    if (!this._isControlledComponent()) {
      this._adapter.setTagsArray(newTagList);
    }
    this._adapter.notifyTagChange(newTagList);
    this._adapter.notifyTagAdd(addTags);
  }
  /**
   * handler of input change
   */
  _onInputChange(value, e) {
    this._adapter.setInputValue(value);
    this._adapter.notifyInputChange(value, e);
  }
  handleSortEnd(callbackProps) {
    const {
      oldIndex,
      newIndex
    } = callbackProps;
    const {
      tagsArray
    } = this.getStates();
    const newTagsArray = (0, _arrayMove.default)(tagsArray, oldIndex, newIndex);
    if (!this._isControlledComponent()) {
      this._adapter.setTagsArray(newTagsArray);
    }
    this._adapter.notifyTagChange(newTagsArray);
  }
}
var _default = exports.default = TagInputFoundation;