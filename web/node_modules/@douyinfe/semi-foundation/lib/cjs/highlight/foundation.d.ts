import BaseFoundation, { DefaultAdapter } from '../base/foundation';
interface HighlightAdapter extends Partial<DefaultAdapter> {
}
interface ChunkQuery {
    autoEscape?: boolean;
    caseSensitive?: boolean;
    searchWords: SearchWords;
    sourceString: string;
}
export interface Chunk {
    start: number;
    end: number;
    highlight: boolean;
    className: string;
    style: Record<string, string>;
}
export interface ComplexSearchWord {
    text: string;
    className?: string;
    style?: Record<string, string>;
}
export type SearchWord = string | ComplexSearchWord | undefined;
export type SearchWords = SearchWord[];
export default class HighlightFoundation extends BaseFoundation<HighlightAdapter> {
    constructor(adapter?: HighlightAdapter);
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
    findAll: ({ autoEscape, caseSensitive, searchWords, sourceString }: ChunkQuery) => Chunk[];
    /**
        * Examine text for any matches.
        * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
        * @return { start:number, end:number }[]
    */
    findChunks: ({ autoEscape, caseSensitive, searchWords, sourceString }: ChunkQuery) => Chunk[];
    /**
   * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
   * @return {start:number, end:number}[]
   */
    combineChunks: ({ chunks }: {
        chunks: Chunk[];
    }) => Chunk[];
    /**
   * Given a set of chunks to highlight, create an additional set of chunks
   * to represent the bits of text between the highlighted text.
   * @param chunksToHighlight {start:number, end:number}[]
   * @param totalLength number
   * @return {start:number, end:number, highlight:boolean}[]
   */
    fillInChunks: ({ chunksToHighlight, totalLength }: {
        chunksToHighlight: Chunk[];
        totalLength: number;
    }) => Chunk[];
}
export {};
