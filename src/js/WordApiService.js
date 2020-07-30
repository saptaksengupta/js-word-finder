import { config } from "./config";

export class WordApiService {

    // static topTenWordUrls;

    getWordDetailsUrl(text) {
        return `${config.WORD_API_END_POINT}?key=${config.API_KEY}&lang=${config.LANG_TRANSLATED_FROM}-${config.LANG_TRANSLATED_TO}&text=${text}`;
    }

    getListOfUrls(textArray) {
        return textArray.map(text => {
            return fetch(this.getWordDetailsUrl(text));
        })
    }

    fetWordDetails(textArray) {
        const arrayOfUrls = this.getListOfUrls(textArray);
        return Promise.all(arrayOfUrls).then((resp) => {
            return Promise.all(resp.map(re => re.json()))
        }).then(data => {
            const fData = this.processResponse(data);
            console.log(fData);
            return fData;
        })
    }


    processResponse(response) {
        const formattedResp = []
        response.map(resp => {
            const formattedObject = {};
            const def = resp.def[0];

            formattedObject["word"] = def.text;
            formattedObject["output"] = {
                count: 1,
                synonyms: this.getSynonyms(def.tr),
                pos: def.pos
            }
            formattedResp.push(formattedObject);
        })

        return formattedResp;
    }

    getSynonyms(translations) {
        return translations.map(tr => {
            return tr.text
        })
    }
}