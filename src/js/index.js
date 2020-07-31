import { WordApiService } from "./WordApiService";

const wordApiService = new WordApiService();

((wordApi) => {

    const outputDom = document.getElementById("output-area");

    window.onReadClicked = () => {
        const arr = ['time', 'play'];
        getWordDetailsFromApi(arr);
    };

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

