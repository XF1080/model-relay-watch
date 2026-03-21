var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
export const isTargetEmit = (event, targetClasses) => {
  // event.path usage is discouraged, use event.composedPath() as it's standard and is more future-proof
  // path is the event-triggered bubbling path, which stores each node through which bubbling passes.
  // path.length-4 is to remove elements above the root node, such as body, html, document, window
  const path = event === null || event === void 0 ? void 0 : event.composedPath();
  const isTarget = path === null || path === void 0 ? void 0 : path.slice(0, path.length - 4).some(node => {
    if (node.className && typeof node.className === "string") {
      return targetClasses.some(c => node.className.includes(c));
    }
    return false;
  });
  return isTarget;
};
export const downloadImage = (src, filename, downloadErrorCb) => __awaiter(void 0, void 0, void 0, function* () {
  try {
    const response = yield fetch(src);
    if (response.ok) {
      const blob = yield response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } else {
      downloadErrorCb(src);
    }
  } catch (error) {
    downloadErrorCb(src);
  }
});
export const crossMerge = function () {
  let leftArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let rightArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let newArr = [];
  const leftLen = leftArr.length;
  const rightLen = rightArr.length;
  const crossLength = leftLen <= rightLen ? leftLen : rightLen;
  new Array(crossLength).fill(0).forEach((item, index) => {
    newArr.push(rightArr[index]);
    newArr.push(leftArr[index]);
  });
  if (leftLen > rightLen) {
    newArr = newArr.concat(leftArr.slice(rightLen, leftLen));
  } else if (leftLen < rightLen) {
    newArr = newArr.concat(rightArr.slice(leftLen, rightLen));
  }
  return newArr;
};
export const getPreloadImagArr = (imgSrc, currentIndex, preLoadGap, infinite) => {
  const beginIndex = currentIndex - preLoadGap;
  const endIndex = currentIndex + preLoadGap;
  const srcLength = imgSrc.length;
  let leftArr = [];
  let rightArr = [];
  if (preLoadGap >= Math.floor(srcLength / 2)) {
    if (infinite) {
      leftArr = imgSrc.concat(imgSrc).slice(beginIndex + srcLength < 0 ? 0 : beginIndex + srcLength, currentIndex + srcLength);
      rightArr = imgSrc.concat(imgSrc).slice(currentIndex + 1, endIndex + 1 < 2 * srcLength ? endIndex + 1 : 2 * srcLength);
    } else {
      leftArr = imgSrc.slice(0, currentIndex);
      rightArr = imgSrc.slice(currentIndex + 1, srcLength);
    }
  } else {
    if (infinite) {
      leftArr = imgSrc.concat(imgSrc).slice(beginIndex + srcLength, currentIndex + srcLength);
      rightArr = imgSrc.concat(imgSrc).slice(currentIndex + 1, endIndex + 1);
    } else {
      if (beginIndex >= 0 && endIndex < srcLength) {
        leftArr = imgSrc.slice(beginIndex, currentIndex);
        rightArr = imgSrc.slice(currentIndex + 1, endIndex + 1);
      } else if (beginIndex < 0) {
        leftArr = imgSrc.slice(0, currentIndex);
        rightArr = imgSrc.slice(currentIndex + 1, 2 * preLoadGap + 1);
      } else {
        rightArr = imgSrc.slice(currentIndex + 1, srcLength);
        leftArr = imgSrc.slice(srcLength - 2 * preLoadGap - 1, currentIndex);
      }
    }
  }
  const result = crossMerge(leftArr.reverse(), rightArr);
  const duplicateResult = Array.from(new Set(result));
  return duplicateResult;
};