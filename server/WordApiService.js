import { config } from "./config";
import * as request from "request";

export class WordApiService {

    getWordDetailsUrl(text) {
        return `${config.WORD_API_END_POINT}?key=${config.API_KEY}&lang=${config.LANG_TRANSLATED_FROM}-${config.LANG_TRANSLATED_TO}&text=${text}`;
    }

    getArrayOfReq(textArray) {
        return textArray.map(text => {
            return new Promise( (resolve, reject) => {
                request(this.getWordDetailsUrl(text.word), { json: true }, (err, resp, body) => {
                    resolve(resp.body);
                });
            }) 
        })
    }

    fetchWordDetails(textArray) {
        const arrayOfReq = this.getArrayOfReq(textArray);
        return Promise.all(arrayOfReq).then(data => {
            const fData = this.processResponse(data, textArray);
            return fData;
        })
    }


    processResponse(response, textArray) {
        for(let i = 0; i < response.length; i++) {
            const def = response[i].def[0];
            textArray[i]["output"] = {
                count: textArray[i].count,
                pos: def ? def.pos : 'NA',
                synonyms: def ? this.getSynonyms(def.tr) : 'NA'
            }
        }
        return textArray;
    }

    getSynonyms(translations) {
        return translations.map(tr => {
            return tr.text
        })
    }
}