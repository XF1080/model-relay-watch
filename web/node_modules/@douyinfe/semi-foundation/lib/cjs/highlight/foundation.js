"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Modified version based on 'highlight-words-core'

const escapeRegExpFn = string => string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
class HighlightFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    /**
     * Creates an array of chunk objects representing both higlightable and non highlightable pieces of text that match each search word.
     *
        findAll ['z'], 'aaazaaazaaa'
            result #=> [
                { start: 0, end: 3, highlight: false }
                { start: 3, end: 4, highlight: true }
                { start: 4, end: 7, highlight: false }
                { start: 7, end: 8, highlight: true }
                { start: 8, end: 11, highlight: false }
            ]
             findAll ['do', 'dollar'], 'aaa do dollar aaa'
            #=> chunks: [
                    { start: 4, end: 6 },
                    { start: 7, end: 9 },
                    { start: 7, end: 13 },
                ]
            #=> chunksToHight: [
                    { start: 4, end: 6 },
                    { start: 7, end: 13 },
                ]
            #=> result: [
                    { start: 0, end: 4, highlight: false },
                    { start: 4, end: 6, highlight: true },
                    { start: 6, end: 7, highlight: false },
                    { start: 7, end: 13, highlight: true },
                    { start: 13, end: 17, highlight: false },
                ]
         * @return Array of "chunks" (where a Chunk is { start:number, end:number, highlight:boolean })
    */
    this.findAll = _ref => {
      let {
        autoEscape = true,
        caseSensitive = false,
        searchWords,
        sourceString
      } = _ref;
      if ((0, _isString2.default)(searchWords)) {
        searchWords = [searchWords];
      }
      const chunks = this.findChunks({
        autoEscape,
        caseSensitive,
        searchWords,
        sourceString
      });
      const chunksToHighlight = this.combineChunks({
        chunks
      });
      const result = this.fillInChunks({
        chunksToHighlight,
        totalLength: sourceString ? sourceString.length : 0
      });
      return result;
    };
    /**
        * Examine text for any matches.
        * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
        * @return { start:number, end:number }[]
    */
    this.findChunks = _ref2 => {
      let {
        autoEscape,
        caseSensitive,
        searchWords,
        sourceString
      } = _ref2;
      return searchWords.map(searchWord => typeof searchWord === 'string' ? {
        text: searchWord
      } : searchWord).filter(searchWord => searchWord.text) // Remove empty words
      .reduce((chunks, searchWord) => {
        let searchText = searchWord.text;
        if (autoEscape) {
          searchText = escapeRegExpFn(searchText);
        }
        const regex = new RegExp(searchText, caseSensitive ? 'g' : 'gi');
        let match;
        while (match = regex.exec(sourceString)) {
          const start = match.index;
          const end = regex.lastIndex;
          if (end > start) {
            chunks.push({
              highlight: true,
              start,
              end,
              className: searchWord.className,
              style: searchWord.style
            });
          }
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
        return chunks;
      }, []);
    };
    /**
    * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
    * @return {start:number, end:number}[]
    */
    this.combineChunks = _ref3 => {
      let {
        chunks
      } = _ref3;
      return chunks.sort((first, second) => first.start - second.start).reduce((processedChunks, nextChunk) => {
        // First chunk just goes straight in the array...
        if (processedChunks.length === 0) {
          return [nextChunk];
        } else {
          // ... subsequent chunks get checked to see if they overlap...
          const prevChunk = processedChunks.pop();
          if (nextChunk.start <= prevChunk.end) {
            // It may be the case that prevChunk completely surrounds nextChunk, so take the
            // largest of the end indeces.
            const endIndex = Math.max(prevChunk.end, nextChunk.end);
            processedChunks.push({
              highlight: true,
              start: prevChunk.start,
              end: endIndex,
              className: prevChunk.className || nextChunk.className,
              style: Object.assign(Object.assign({}, prevChunk.style), nextChunk.style)
            });
          } else {
            processedChunks.push(prevChunk, nextChunk);
          }
          return processedChunks;
        }
      }, []);
    };
    /**
    * Given a set of chunks to highlight, create an additional set of chunks
    * to represent the bits of text between the highlighted text.
    * @param chunksToHighlight {start:number, end:number}[]
    * @param totalLength number
    * @return {start:number, end:number, highlight:boolean}[]
    */
    this.fillInChunks = _ref4 => {
      let {
        chunksToHighlight,
        totalLength
      } = _ref4;
      const allChunks = [];
      const append = (start, end, highlight, className, style) => {
        if (end - start > 0) {
          allChunks.push({
            start,
            end,
            highlight,
            className,
            style
          });
        }
      };
      if (chunksToHighlight.length === 0) {
        append(0, totalLength, false);
      } else {
        let lastIndex = 0;
        chunksToHighlight.forEach(chunk => {
          append(lastIndex, chunk.start, false);
          append(chunk.start, chunk.end, true, chunk.className, chunk.style);
          lastIndex = chunk.end;
        });
        append(lastIndex, totalLength, false);
      }
      return allChunks;
    };
  }
}
exports.default = HighlightFoundation;