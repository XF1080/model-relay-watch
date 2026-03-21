"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _semiJsonViewerCore = require("@douyinfe/semi-json-viewer-core");
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class JsonViewerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, JsonViewerFoundation), adapter));
    this.jsonViewer = null;
  }
  init() {
    const props = this.getProps();
    const editorRef = this._adapter.getEditorRef();
    this.jsonViewer = new _semiJsonViewerCore.JsonViewer(editorRef, props.value, Object.assign({
      prefixCls: _constants.cssClasses.PREFIX
    }, props.options));
    this.jsonViewer.emitter.on('customRender', e => {
      this._adapter.notifyCustomRender(e.customRenderMap);
    });
    this.jsonViewer.layout();
    this.jsonViewer.emitter.on('contentChanged', e => {
      var _a;
      this._adapter.notifyChange((_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getModel().getValue());
      if (this.getState('showSearchBar')) {
        this.search(this._adapter.getSearchRef().value);
      }
    });
  }
  search(searchText, caseSensitive, wholeWord, regex) {
    var _a;
    let options;
    if (caseSensitive !== undefined || wholeWord !== undefined || regex !== undefined) {
      options = {
        caseSensitive: caseSensitive !== null && caseSensitive !== void 0 ? caseSensitive : false,
        wholeWord: wholeWord !== null && wholeWord !== void 0 ? wholeWord : false,
        regex: regex !== null && regex !== void 0 ? regex : false
      };
    } else {
      options = this.getState('searchOptions');
    }
    const {
      caseSensitive: cs,
      wholeWord: ww,
      regex: rx
    } = options;
    (_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getSearchWidget().search(searchText, cs, ww, rx);
  }
  prevSearch(step) {
    var _a, _b;
    if (step === undefined) {
      (_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getSearchWidget().navigateResults(-1);
    } else {
      (_b = this.jsonViewer) === null || _b === void 0 ? void 0 : _b.getSearchWidget().navigateResults(-step);
    }
  }
  nextSearch(step) {
    var _a, _b;
    if (step === undefined) {
      (_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getSearchWidget().navigateResults(1);
    } else {
      (_b = this.jsonViewer) === null || _b === void 0 ? void 0 : _b.getSearchWidget().navigateResults(step);
    }
  }
  replace(replaceText) {
    var _a;
    if (this.getProps().options.readOnly) {
      return;
    }
    (_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getSearchWidget().replace(replaceText);
  }
  replaceAll(replaceText) {
    var _a;
    if (this.getProps().options.readOnly) {
      return;
    }
    (_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getSearchWidget().replaceAll(replaceText);
  }
  setSearchOptions(key) {
    this._adapter.setSearchOptions(key);
  }
  showSearchBar() {
    this._adapter.showSearchBar();
  }
  getSearchResults() {
    var _a;
    return (_a = this.jsonViewer) === null || _a === void 0 ? void 0 : _a.getSearchWidget().searchResults;
  }
}
var _default = exports.default = JsonViewerFoundation;