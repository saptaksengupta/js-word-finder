import path from "path";
import express from "express";
import * as fs from "fs";
import * as cors from "cors";
import * as request from "request";

import { WordParser } from "./WordParser";

const router = express.Router();

const app = express();

app.get("/", (req, res) => {
  res.json({ code: 200, message: "backend serve started" });
});

app.get("/parse-file", (req, res) => {
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
    res.json({ code: 200, message: topTenWords});
  });
});

app.use(cors);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
