import React, { useState, useCallback, useEffect } from 'react';
import Collapsible from '../../../collapsible';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import { IconStoryStroked, IconChevronDown, IconChevronUp } from '@douyinfe/semi-icons';
const prefixCls = cssClasses.PREFIX_STEP;
const {
  PREFIX_CONTENT
} = cssClasses;
export const DialogueStepWidget = props => {
  const [openIndexes, setOpenIndexes] = useState(() => new Set(props.steps.map((_, i) => i)));
  useEffect(() => {
    setOpenIndexes(new Set(props.steps.map((_, i) => i)));
  }, [props.steps]);
  const toggleOpen = useCallback(idx => {
    setOpenIndexes(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);
  const completedIcon = () => {
    return /*#__PURE__*/React.createElement(IconStoryStroked, {
      className: `${prefixCls}-completed`
    });
  };
  const loadingIcon = () => {
    return /*#__PURE__*/React.createElement("span", {
      className: `${PREFIX_CONTENT}-loading`
    }, /*#__PURE__*/React.createElement("span", {
      className: `${PREFIX_CONTENT}-loading-item`
    }), /*#__PURE__*/React.createElement("span", {
      className: `${PREFIX_CONTENT}-loading-item`
    }), /*#__PURE__*/React.createElement("span", {
      className: `${PREFIX_CONTENT}-loading-item`
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper`
  }, props.steps.map((item, index) => {
    const {
      summary,
      status,
      actions
    } = item;
    const isOpen = openIndexes.has(index);
    const actionsLength = actions === null || actions === void 0 ? void 0 : actions.length;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}`,
      role: "button",
      tabIndex: 0,
      onClick: () => toggleOpen(index),
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen(index);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-prefix`
    }, status === 'completed' ? completedIcon() : loadingIcon()), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-summary`
    }, summary), actionsLength > 0 && (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-suffix`
    }, isOpen ? /*#__PURE__*/React.createElement(IconChevronUp, null) : /*#__PURE__*/React.createElement(IconChevronDown, null)))), /*#__PURE__*/React.createElement(Collapsible, {
      isOpen: isOpen
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-panel`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-line`
    }), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-action-wrapper`
    }, actions === null || actions === void 0 ? void 0 : actions.map((action, i) => (/*#__PURE__*/React.createElement("div", {
      key: i,
      className: `${prefixCls}-action`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-action-summary`
    }, action.summary), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-action-desc`
    }, action.icon, action.description))))))));
  }));
};