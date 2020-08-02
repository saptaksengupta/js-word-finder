import "../sass/main.scss";

(() => {
  const outContainerDom = document.getElementById("output-container");
  const outputDom = document.getElementById("output-area");
  const inputUrlDom = document.getElementById("file-url-input");
  const loaderDom = document.getElementById("loader-container");

  window.onReadClicked = () => {
    const sourceUrl = inputUrlDom.value.trim();
    if (!isvallidUrl(sourceUrl)) {
      alert("expecting a valid url");
      return false;
    }
    showLoader(true);
    fetch(`http://localhost:8080/parse-file?sourceUrl=${sourceUrl}`, {
      mode: "cors",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        showLoader(false);
        if (resp.data) {
          renderOutput(resp.data);
        }
      })
      .catch((err) => {
        showLoader(false);
        console.log(err);
      });
  };

  const isvallidUrl = (sourceUrl) => {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regexp = new RegExp(expression);
    return sourceUrl.match(regexp);
  };

  const showLoader = (flag) => {
    if (flag) {
      loaderDom.style.display = "flex";
      outContainerDom.style.display = "none";
    } else {
      loaderDom.style.display = "none";
      outContainerDom.style.display = "flex";
    }
  };

  const renderOutput = (output) => {
    outContainerDom.style.display = "block";
    outputDom.textContent = JSON.stringify(output, null, 2);
  };
})();
