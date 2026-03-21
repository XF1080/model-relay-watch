"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byteMB = exports.byteKB = void 0;
exports.endsWith = endsWith;
exports.getFileSize = getFileSize;
exports.loopFiles = loopFiles;
exports.mapFileTree = mapFileTree;
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
const byteKB = exports.byteKB = 1024;
const byteMB = exports.byteMB = 1048576;
function getFileSize(number) {
  if (number < byteKB) {
    return `${(number / byteKB).toFixed(2)}KB`;
  } else if (number >= byteKB && number < byteMB) {
    return `${(number / byteKB).toFixed(1)}KB`;
  } else if (number >= byteMB) {
    return `${(number / byteMB).toFixed(1)}MB`;
  }
  return undefined;
}
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function loopFiles(item) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((res, rej) => {
      const dirReader = item.createReader();
      let fileList = [];
      function sequence() {
        dirReader.readEntries(entries => {
          const entryList = Array.prototype.slice.apply(entries);
          fileList = fileList.concat(entryList);
          // Check if all the file has been viewed
          const isFinished = !entryList.length;
          if (isFinished) {
            res(fileList);
          } else {
            sequence();
          }
        }, rej);
      }
      sequence();
    });
  });
}
function mapFileTree(items) {
  return __awaiter(this, void 0, void 0, function* () {
    const promises = [];
    const _traverseFileTree = (item, path) => __awaiter(this, void 0, void 0, function* () {
      path = path || '';
      //@ts-ignore add path property into item
      item.path = path;
      if (item.isFile) {
        promises.push(new Promise((res, rej) => {
          item.file(file => {
            if (item.fullPath && !file.webkitRelativePath) {
              // This file is provided to the user based on the relative path of the drag and drop folder
              // If you drag the Upload folder, the path of the internal file may be Upload/File/a.png, etc
              Object.defineProperties(file, {
                webkitRelativePath: {
                  writable: true
                }
              });
              //@ts-ignore add webkitRelativePath property into file
              file.webkitRelativePath = item.fullPath.replace(/^\//, '');
              Object.defineProperties(file, {
                webkitRelativePath: {
                  writable: false
                }
              });
            }
            res(file);
          }, rej);
        }));
      } else if (item.isDirectory) {
        const entries = yield loopFiles(item);
        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];
          yield _traverseFileTree(entry, `${path}${item.name}/`);
        }
      }
    });
    try {
      const batches = items.map(i => _traverseFileTree(i.webkitGetAsEntry()));
      // Perform asynchronous operations to add the required promises to the queue
      yield Promise.all(batches);
      // Execution queue
      const result = yield Promise.all(promises);
      return result;
    } catch (error) {
      console.warn('Captured error while loop directory.');
      console.error(error);
      return [];
    }
  });
}