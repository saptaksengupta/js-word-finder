(() => {
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

    const renderOutput = (output) => {
        outputDom.textContent = JSON.stringify(output, null, 2);
    };
})();

