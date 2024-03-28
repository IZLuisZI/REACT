const { join } = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
let hltb = require("howlongtobeat");
let hltbService = new hltb.HowLongToBeatService();
const app = express();

/* 
Use in code
Add imports
javascript
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();
typescript
import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

let hltbService = new HowLongToBeatService();
Searching for a game
hltbService.search('Nioh').then(result => console.log(result));
search() will return a Promise with an Array<HowLongToBeatEntry>

Search response example:
[ {
    id: '36936',
    name: 'Nioh',
    imageUrl: 'https://howlongtobeat.com/gameimages/36936_Nioh.jpg',
    timeLabels: [ [Array], [Array], [Array] ],
    gameplayMain: 34.5,
    gameplayMainExtra: 61,
    gameplayCompletionist: 93.5,
    similarity: 1,
    searchTerm: 'Nioh'
    },
    {
    id: '50419',
    name: 'Nioh: Complete Edition',
    imageUrl: 'https://howlongtobeat.com/gameimages/50419_Nioh_Complete_Edition.jpg',
    timeLabels: [ [Array], [Array], [Array] ],
    gameplayMain: 42,
    gameplayMainExtra: 84,
    gameplayCompletionist: 97,
    similarity: 0.18,
    searchTerm: 'Nioh'
    },
    ...
]
Getting details for a game
hltbService.detail('36936').then(result => console.log(result)).catch(e => console.error(e));
The detail() method will return a Promise with an HowLongToBeatEntry. If the id is not known, an error is thrown, you should catch the Promise anyway.

Detail response example:
{
  id: '36936',
  name: 'Nioh',
  imageUrl: 'https://howlongtobeat.com/gameimages/36936_Nioh.jpg',
  timeLabels:
   [ [ 'gameplayMain', 'Main Story' ],
     [ 'gameplayMainExtra', 'Main + Extras' ],
     [ 'gameplayComplete', 'Completionist' ] ],
  gameplayMain: 34.5,
  gameplayMainExtra: 61,
  gameplayCompletionist: 93.5,
  similarity: 1,
  searchTerm: 'Nioh'
}

*/
/* const app = express();
app.use(cors());

const server = http.createServer(app);
server.listen(5173);

app.get("/game/:gameName", (req, res) => {
  const gameName = decodeURIComponent(req.params.gameName);
  hltbService.search(gameName).then((result) => {
    res.json(result);
  });
});
*/
app.listen(1234);
app.use(cors());

app.get("/games/game/:gameName", (req, res) => {
  const gameName = decodeURIComponent(req.params.gameName);
  hltbService.search(gameName).then((result) => {
    res.json(result);
  });
});
