import _isEqual from "lodash/isEqual";
import React, { PureComponent } from 'react';
import TreeContext from './treeContext';
import NodeCollapsible from './nodeCollapsible';
const getTreeNodeKey = treeNode => {
  return treeNode.key;
};
export default class NodeList extends PureComponent {
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
    const hasChanged = !_isEqual(prevState.cachedMotionKeys, motionKeys) || !_isEqual(prevState.cachedData.map(i => i.key), flattenNodes.map(i => i.key));
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
        return /*#__PURE__*/React.createElement(NodeCollapsible, {
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
NodeList.contextType = TreeContext;