import React, { useState } from 'react';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/notification/constants';
import HookNotice from './HookNotice';
import '@douyinfe/semi-foundation/lib/es/notification/notification.css';
import getUuid from '@douyinfe/semi-foundation/lib/es/utils/uuid';
// TODO: Automatic folding + unfolding function when there are more than N
const defaultConfig = {
  duration: 3,
  position: 'topRight',
  motion: true,
  content: '',
  title: '',
  zIndex: 1010
};
function usePatchElement() {
  const [elements, setElements] = useState([]);
  function patchElement(element, config) {
    setElements(originElements => [{
      element,
      config
    }, ...originElements]);
    return id => {
      setElements(originElements => originElements.filter(_ref => {
        let {
          config: configOfCurrentElement
        } = _ref;
        return configOfCurrentElement.id !== id;
      }));
    };
  }
  function renderList() {
    const noticesInPosition = {
      top: [],
      topLeft: [],
      topRight: [],
      bottom: [],
      bottomLeft: [],
      bottomRight: []
    };
    elements.forEach(_ref2 => {
      let {
        element,
        config
      } = _ref2;
      const {
        position
      } = config;
      noticesInPosition[position].push(element);
    });
    return Object.entries(noticesInPosition).map(obj => {
      const pos = obj[0];
      const notices = obj[1];
      // @ts-ignore
      // eslint-disable-next-line react/no-unknown-property
      return Array.isArray(notices) && notices.length ? /*#__PURE__*/React.createElement("div", {
        key: pos,
        className: cls(cssClasses.LIST),
        placement: pos
      }, notices) : null;
    });
  }
  return [renderList(), patchElement];
}
export default function useNotification() {
  const [elements, patchElement] = usePatchElement();
  const noticeRef = new Map();
  const addNotice = config => {
    const id = getUuid('semi_notice_');
    const mergeConfig = Object.assign(Object.assign({}, config), {
      id
    });
    let closeFunc;
    const ref = ele => {
      noticeRef.set(id, ele);
    };
    const notice = /*#__PURE__*/React.createElement(HookNotice, Object.assign({
      key: id
    }, mergeConfig, {
      afterClose: instanceID => closeFunc(instanceID),
      ref: ref
    }));
    closeFunc = patchElement(notice, Object.assign({}, mergeConfig));
    return id;
  };
  const removeElement = instanceID => {
    const ele = noticeRef.get(instanceID);
    ele && ele.close();
  };
  return [{
    success: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'success'
    })),
    info: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'info'
    })),
    error: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'error'
    })),
    warning: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'warning'
    })),
    open: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'default'
    })),
    close: removeElement
  }, /*#__PURE__*/React.createElement(React.Fragment, null, elements)];
}