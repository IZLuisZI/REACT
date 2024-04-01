const { join } = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
let hltb = require("howlongtobeat");
let hltbService = new hltb.HowLongToBeatService();
const app = express();

app.listen(1234);
app.use(cors());

app.get("/games/game/:gameName", (req, res) => {
  const gameName = decodeURIComponent(req.params.gameName);
  hltbService.search(gameName).then((result) => {
    res.json(result);
  });
});
