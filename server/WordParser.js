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
    this.FRONT = 1;
    this.wordDictionaryHeap = new Array();
    this.wordDictionaryHeap.push({});
    this.wordDictionaryHash = new Map();
    this.wordsArray = wordsArray;
    this.size = 0;
  }

  getElementIndexFormHeap(word) {
    return this.doBinarySearchForElement(
      this.wordDictionaryHeap,
      0,
      this.wordDictionaryHeap.length,
      word
    );
  }

  doBinarySearchForElement(arr, start, end, element) {
    if (end - start <= 0) {
      return -1;
    }

    let mid = Math.trunc(start + (end - start) / 2);

    if (arr[mid].word === element) {
      return mid;
    } else if (arr[start].word === element) {
      return start;
    } else if (arr[end - 1].word === element) {
      return end - 1;
    }

    const lMid = this.doBinarySearchForElement(arr, start, mid, element);
    const rMid = this.doBinarySearchForElement(arr, mid + 1, end, element);

    if (lMid >= 0) {
      return lMid;
    }

    if (rMid >= 0) {
      return rMid;
    }

    return -1;
  }

  getTopTenByHeap() {
    this.wordsArray.forEach((word) => {
      if (!this.wordDictionaryHash.has(word)) {
        this.wordDictionaryHash.set(word, 1);
      } else {
        let prevCount = this.wordDictionaryHash.get(word);
        this.wordDictionaryHash.set(word, ++prevCount);
      }
    });
    
    const obj = Object.fromEntries(this.wordDictionaryHash);
    for (let key in obj) {
      this.wordDictionaryHeap.push({
        word: key,
        count: obj[key]
      })
    }
    this.size = this.wordDictionaryHeap.length - 1;
    this.buildHeap(this.wordDictionaryHeap);
    return [
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
      this.popElement(),
    ];
  }

  buildHeap(arr) {
    for (let i = Math.trunc(this.size / 2); i >= 1; i--) {
      this.maxHeapify(i);
    }
  }

  popElement() {
    const poppedElement = this.wordDictionaryHeap[this.FRONT];
    this.wordDictionaryHeap[this.FRONT] = this.wordDictionaryHeap[this.size];
    this.size -= 1;
    this.maxHeapify(this.FRONT);

    this.wordDictionaryHeap[this.size + 1] = poppedElement;
    return poppedElement;
  }

  maxHeapify(pos) {
    if (!this.isLeaf(pos) && this.wordDictionaryHeap.length > 2) {
      const lcValue =
        this.leftChild(pos) != null
          ? this.wordDictionaryHeap[this.leftChild(pos)].count
          : null;
      const rcValue =
        this.rightChild(pos) != null
          ? this.wordDictionaryHeap[this.rightChild(pos)].count
          : null;
      if (
        this.wordDictionaryHeap[pos]["count"] < lcValue ||
        this.wordDictionaryHeap[pos]["count"] < rcValue
      ) {
        //swap with the greater child
        if (lcValue > rcValue) {
          this.swap(pos, this.leftChild(pos));
          this.maxHeapify(this.leftChild(pos));
        } else {
          this.swap(pos, this.rightChild(pos));
          this.maxHeapify(this.rightChild(pos));
        }
      }
    }
  }

  swap(posA, posB) {
    const temp = this.wordDictionaryHeap[posA];
    this.wordDictionaryHeap[posA] = this.wordDictionaryHeap[posB];
    this.wordDictionaryHeap[posB] = temp;
  }

  isLeaf(pos) {
    return pos > Math.trunc(this.size / 2) && pos < this.size;
  }

  parent(pos) {
    return Math.trunc(pos / 2);
  }

  leftChild(pos) {
    return this.wordDictionaryHeap[pos * 2] ? pos * 2 : null;
  }

  rightChild(pos) {
    return this.wordDictionaryHeap[pos * 2 + 1] ? pos * 2 + 1 : null;
  }
}

export { WordParser };
