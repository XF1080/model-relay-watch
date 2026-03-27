"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _findLastIndex2 = _interopRequireDefault(require("lodash/findLastIndex"));
var _isMap2 = _interopRequireDefault(require("lodash/isMap"));
var _includes2 = _interopRequireDefault(require("lodash/includes"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TableBodyFoundation extends _foundation.default {
  init() {
    this.initVirtualizedData();
    this.initExpandBtnShouldInRow();
  }
  destroy() {
    this.unobserveBodyResize();
  }
  initVirtualizedData(cb) {
    this._adapter.setVirtualizedData(this.flattenData(this.getProp('dataSource')), cb);
  }
  initExpandBtnShouldInRow(newExpandRelatedProps) {
    const props = this.getProps(); // TODO check: this._adapter.getProps -> this.getProps
    const cachedExpandBtnShouldInRow = (0, _utils.expandBtnShouldInRow)(props);
    this._adapter.setCachedExpandBtnShouldInRow(cachedExpandBtnShouldInRow);
    if (!(0, _isObject2.default)(newExpandRelatedProps) && !newExpandRelatedProps) {
      const expandRelatedProps = _constants.strings.EXPAND_RELATED_PROPS;
      newExpandRelatedProps = expandRelatedProps.map(key => (0, _get2.default)(props, key, undefined));
    }
    this._adapter.setCachedExpandRelatedProps(newExpandRelatedProps);
  }
  flattenData() {
    let dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let parentKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let childrenKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    const flattenData = [];
    const {
      rowKey,
      childrenRecordName,
      expandedRowRender,
      expandedRowKeys,
      groups
    } = this.getProps();
    if (level === 0 && (0, _isMap2.default)(groups)) {
      groups.forEach((set, key) => {
        const firstIndex = dataSource.findIndex(record => set.has((0, _utils.getRecordKey)(record, rowKey)));
        if (firstIndex > -1) {
          const lastIndex = (0, _findLastIndex2.default)(dataSource, record => set.has((0, _utils.getRecordKey)(record, rowKey)));
          const expanded = (0, _includes2.default)(expandedRowKeys, key);
          flattenData.push({
            key,
            level,
            sectionRow: true,
            group: set,
            groupKey: key,
            expanded
          });
          if (expanded) {
            flattenData.push(...this.flattenData(dataSource.slice(firstIndex, lastIndex + 1), level + 1, [...parentKeys], [...childrenKeys]));
          }
        }
      });
    } else {
      dataSource.forEach((record, index) => {
        const recordKey = (0, _utils.getRecordKey)(record, rowKey);
        const children = (0, _utils.getRecordChildren)(record, childrenRecordName);
        if (level) {
          childrenKeys.push(recordKey);
        }
        const item = {
          key: recordKey,
          record,
          level,
          parentKeys: [...parentKeys],
          childrenKeys: [...childrenKeys]
        };
        flattenData.push(item);
        const extras = [];
        if ((0, _includes2.default)(expandedRowKeys, recordKey)) {
          if (Array.isArray(children) && children.length) {
            extras.push(...this.flattenData(children, level + 1, [...item.parentKeys], [...item.childrenKeys]));
          } else if (expandedRowRender) {
            extras.push({
              key: (0, _utils.genExpandedRowKey)(recordKey),
              level,
              expandedRow: true,
              record
            });
          }
          flattenData.push(...extras);
        }
      });
    }
    return flattenData;
  }
  /**
   * Use ResizeObserver to monitor changes in the size of the body content area, and notify Table to recalculate if it changes. columns #1219
   * (Only monitor the scroll.y scene, other scenes are not monitored, because the header of the scroll.y scene is a separate table, and a scrollbar column will be inserted)
   */
  observeBodyResize(bodyDOM) {
    const {
      scroll
    } = this.getProps(); // TODO check: this._adapter.getProps -> this.getProps
    if ((0, _get2.default)(scroll, 'y')) {
      return this._adapter.observeBodyResize(bodyDOM);
    }
  }
  unobserveBodyResize() {
    return this._adapter.unobserveBodyResize();
  }
}
exports.default = TableBodyFoundation;