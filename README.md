## Js Word Finder
A simple word detail finder using nodejs in server side. and vanilla javasciprt in frontend.

## Problem Statement

Find occurrences count of word in given text document. (Link of the document).

### Local Setup

After clone the repository (master branch) all you have to do is:

To install the dependencies
```bash
npm install
```
Requesting you to build the server code first by 
```bash
npm run build
```

Open two diffrent terminal window to run the backend and frontend server separately and run this to command resepectively.

To start the backend node server
```bash
npm run start:server
```

To start the frontend application server
```bash
npm run start:dev
```

Open http://localhost:6600 to play with application -- 

Provide a valid text file link in the shown text box to parse it.

### Api used to get the word details

https://dictionary.yandex.net/api/v1/dicservice.json/lookup

and the sample text file that is being used to test the algo: http://norvig.com/big.txt

### Approach in brief

There are couple of ways to find occurrences in a particaular textfile or any source. but the main thing that matters the most is something called the `Time Complexity` and the `Space complexity` denoted by big `o` ( O(n) ).

Just to make it efficent I have used `Heap` and `Hashmap` data structures.

Approach is all about read the file from the source and store it into a HashMap with the `word` as index and `count` as value.

Then it will become easy to make a `Max binary Heap` from the hashmap. So that we can pop the first k (10 in our case) element from the heap to get the top K elements.


## Author
Saptak Sengupta
