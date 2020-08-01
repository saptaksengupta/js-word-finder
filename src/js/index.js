import { WordApiService } from "./WordApiService";
import { WordParser } from "./WordParser";

const wordApiService = new WordApiService();
const wordParser = new WordParser();

((wordApi) => {

    const outputDom = document.getElementById("output-area");
    const inputUrlDom = document.getElementById("file-url-input");

    window.onReadClicked = () => {
        const arr = ['time', 'play'];
        // getWordDetailsFromApi(arr);
        const sourceUrl = inputUrlDom.value.trim();
        fetch("http://localhost:8080/parse-file", {
            method: "POST"
        }).then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        })
    };


    const fetchWordListFromSource = (sourceUrl) => {
        // fetch(sourceUrl)
        //   .then((resp) => resp.json())
        //   .then(data => console.log(data))
        //   .catch((err) => {});
      }

    const getWordDetailsFromApi = (arr) => {
        wordApi.fetWordDetails(arr).then(resp => {
            renderOutput(resp);
        }).catch(err => {
            console.log("error occured: ", err);
        })
    }

    const renderOutput = (output) => {
        outputDom.textContent = JSON.stringify(output, null, 2);
    };
})(wordApiService);

