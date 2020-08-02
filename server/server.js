import path from "path";
import express from "express";
import * as fs from "fs";
import * as cors from "cors";
import * as request from "request";

import { WordParser } from "./WordParser";
import { WordApiService } from "./WordApiService";

const router = express.Router();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ code: 200, message: "backend serve started" });
});

app.get("/parse-file", (req, res) => {
  const wordApi = new WordApiService();

  const fileUrl = req.query.sourceUrl;
  let textFileContent = null;
  request(fileUrl, { json: false }, (error, resp, body) => {
    textFileContent = resp.body;
    const wordsArray = textFileContent
      .replace(/[.,?!;()"'-]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[0-9]+/g, "")
      .toLowerCase()
      .split(" ");

    const wordparser = new WordParser(wordsArray);
    const topTenWords = wordparser.getTopTenByHeap();
    // res.json({ code: 200, message: topTenWords });
    wordApi
      .fetchWordDetails(topTenWords)
      .then(data => {
        res.json({ code: 200, data: data });
      })
      .catch((err) => {
        console.log("error occured: ", err);
      });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
