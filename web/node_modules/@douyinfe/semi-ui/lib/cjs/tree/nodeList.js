"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireWildcard(require("react"));
var _treeContext = _interopRequireDefault(require("./treeContext"));
var _nodeCollapsible = _interopRequireDefault(require("./nodeCollapsible"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getTreeNodeKey = treeNode => {
  return treeNode.key;
};
class NodeList extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.onMotionEnd = () => {
      typeof this.props.onMotionEnd === 'function' && this.props.onMotionEnd();
      this.setState({
        transitionNodes: []
      });
    };
    this.state = {
      transitionNodes: []
    };
  }
  static getDerivedStateFromProps(props, prevState) {
    const {
      flattenNodes = [],
      motionKeys,
      motionType,
      flattenList = []
    } = props;
    const hasChanged = !(0, _isEqual2.default)(prevState.cachedMotionKeys, motionKeys) || !(0, _isEqual2.default)(prevState.cachedData.map(i => i.key), flattenNodes.map(i => i.key));
    const motionArr = [...motionKeys];
    if (!hasChanged || !motionArr.length) {
      return null;
    }
    const transitionNodes = [];
    const transitionRange = [];
    let rangeStart = 0;
    let newState = {};
    const lookUpTarget = motionType === 'hide' && flattenList ? flattenList : flattenNodes;
    lookUpTarget.forEach((treeNode, ind) => {
      const nodeKey = getTreeNodeKey(treeNode);
      if (motionKeys.has(nodeKey)) {
        transitionRange.push(treeNode);
        if (nodeKey === motionArr[0]) {
          rangeStart = ind;
        }
      } else {
        transitionNodes.push(treeNode);
      }
    });
    transitionNodes.splice(rangeStart, 0, transitionRange);
    newState = {
      transitionNodes,
      cachedData: flattenNodes,
      cachedMotionKeys: motionKeys,
      cachedMotionType: motionType
    };
    return newState;
  }
  render() {
    const {
      flattenNodes,
      motionType,
      searchTargetIsDeep,
      renderTreeNode
    } = this.props;
    const {
      transitionNodes
    } = this.state;
    const mapData = transitionNodes.length && !searchTargetIsDeep ? transitionNodes : flattenNodes;
    const options = mapData.map(treeNode => {
      const isMotionNode = Array.isArray(treeNode);
      if (isMotionNode && !treeNode.length) {
        return null;
      }
      if (isMotionNode && treeNode.length) {
        const nodeKey = getTreeNodeKey(treeNode[0]);
        return /*#__PURE__*/_react.default.createElement(_nodeCollapsible.default, {
          open: motionType === 'hide',
          duration: 200,
          motion: Boolean(motionType),
          key: `motion-${nodeKey}`,
          onMotionEnd: this.onMotionEnd
        }, treeNode.map(node => renderTreeNode(node)));
      }
      return renderTreeNode(treeNode);
    });
    return options;
  }
}
exports.default = NodeList;
NodeList.contextType = _treeContext.default;