const express = require("express");
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
// rawg api
app.get("/api/games", (req, res) => {
  const page = req.query.page || 1;
  const apiKey = process.env.RAWG_API_KEY; // Make sure to set this environment variable
  fetch(`https://api.rawg.io/api/games?key=20ecfcdedf7f4aae8ac08fbc35020cc4`)
    .then((response) => response.json())
    .then((data) => res.json(data.results))
    .catch((error) => console.error("Error fetching data: ", error));
});
