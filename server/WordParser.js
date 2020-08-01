import { config } from "../src/js/config";

// our Heap data structure will look like:-
// [
//     {"wordText": "count"},
//     {"wordText": "count"},
//     {"wordText": "count"},
//     {"wordText": "count"}
// ]

class WordParser {
  constructor(wordsArray = []) {
    this.wordDictionaryHeap = new Array();
    this.wordDictionaryHash = new Map();
    this.wordsArray = wordsArray;
  }

  buildDictionary(wordsArray) {
    this.wordsArray.map(word => {
      this.wordsArray
    })
  }

  getElementIndexFormHeap() {
    return this.doBinarySearchForElement(this.wordDictionaryHeap, 0, this.wordDictionaryHeap.length);
  }

  doBinarySearchForElement(arr, start, end) {
    let mid = Math.trunc(end - (start + end) / 2);
  }


  getTopTenByHeap() {
    this.wordsArray.forEach((word) => {
      // cosnt heapObj = {word: word, count: }
    });
  }


  getTopTenByHashing() {
    this.wordsArray.forEach((word) => {
      if (!this.wordDictionaryHash.has(word)) {
        this.wordDictionaryHash.set(word, {count: 1});
      } else {
        let prevCount = this.wordDictionaryHash.get(word);
        this.wordDictionaryHash.set(word, {count: ++prevCount});
      }
    });

    this.wordDictionaryHash[Symbol.iterator] = function* (){
      yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
    return this.wordDictionaryHash;
  }
}

export {WordParser};
