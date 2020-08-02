(() => {
    const outputDom = document.getElementById("output-area");
    const inputUrlDom = document.getElementById("file-url-input");

    window.onReadClicked = () => {
        const sourceUrl = inputUrlDom.value.trim();
        fetch(`http://localhost:8080/parse-file?sourceUrl=${sourceUrl}`, {mode: "cors"}).then(resp => resp.json()).then(resp => {
            if (resp.data) {
                renderOutput(resp.data);
            }
        }).catch(err => {
            console.log(err);
        })
    };

    const renderOutput = (output) => {
        outputDom.textContent = JSON.stringify(output, null, 2);
    };
})();

