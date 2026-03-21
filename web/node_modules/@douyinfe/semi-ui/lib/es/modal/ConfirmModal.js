var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useState, useCallback } from 'react';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/modal/constants';
import Modal from './Modal';
import { isSemiIcon } from '../_utils';
import '@douyinfe/semi-foundation/lib/es/modal/modal.css';
const ConfirmModal = props => {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState();
  const [cancelLoading, setCancelLoading] = useState();
  const {
    direction
  } = props;
  const {
      title,
      content,
      icon,
      type,
      onCancel,
      onOk,
      className
    } = props,
    rest = __rest(props, ["title", "content", "icon", "type", "onCancel", "onOk", "className"]);
  const handleOk = useCallback(e => {
    const res = onOk && onOk(e);
    if (res && res.then) {
      setConfirmLoading(true);
      res.then(function () {
        setVisible(false);
        setConfirmLoading(false);
      }, err => {
        setConfirmLoading(false);
      });
    } else {
      setVisible(false);
    }
  }, [onOk]);
  const handleCancel = useCallback(e => {
    const res = onCancel && onCancel(e);
    if (res && res.then) {
      setCancelLoading(true);
      res.then(function () {
        setVisible(false);
        setCancelLoading(false);
      }, err => {
        setCancelLoading(false);
      });
    } else {
      setVisible(false);
    }
  }, [onCancel]);
  const confirmCls = `${cssClasses.DIALOG}-confirm`;
  const wrapperCls = cls(className, confirmCls, {
    [`${confirmCls}-rtl`]: direction === 'rtl'
  });
  const typeCls = cls(`${cssClasses.DIALOG}-${type}`);
  const iconNode = isSemiIcon(icon) ? /*#__PURE__*/React.cloneElement(icon, {
    className: `${confirmCls}-icon ${typeCls}-icon`,
    size: 'extra-large'
  }) : icon;
  const titleNode = title == null ? null : /*#__PURE__*/React.createElement("span", {
    className: `${confirmCls}-title-text`
  }, title);
  const contentCls = cls(`${confirmCls}-content`, {
    [`${confirmCls}-content-withIcon`]: props.icon
  });
  return /*#__PURE__*/React.createElement(Modal, Object.assign({
    className: wrapperCls,
    title: titleNode,
    confirmLoading: confirmLoading,
    cancelLoading: cancelLoading,
    onOk: handleOk,
    onCancel: handleCancel,
    icon: iconNode,
    visible: visible
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: contentCls,
    "x-semi-prop": "content"
  }, content));
};
export default ConfirmModal;