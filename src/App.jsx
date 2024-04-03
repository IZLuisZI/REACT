import { useState, useEffect } from "react";
import SearchBar from "./SearchBar.jsx";
import Games from "./Games.jsx";
import Sort from "./Sort.jsx";
import Images from "./Images.jsx";
import GameInfo from "./GameInfo.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_API_KEY;
  const server = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${server}/api/games`)
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  console.log(games);

  useEffect(() => {
    function handleScroll() {
      const isAtBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 400;

      if (isAtBottom) {
        fetchmoregames();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  function fetchmoregames() {
    const newPage = page + 1;
    setPage(newPage);
    fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&page_size=100&page=${newPage}`
    )
      .then((response) => response.json())
      .then((data) => setGames((prevGames) => [...prevGames, ...data.results]))
      .catch((error) => console.error("Error fetching data: ", error));
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="wrapper">
            <summary>
              <h1>Game Search demo 🔍</h1>
            </summary>

            <SearchBar onSearch={setSearchTerm} setGames={setGames} />
            <Sort />
            <Games
              games={games}
              searchTerm={searchTerm}
              onGameSelect={setSelectedGame}
              onGameSelectinfo={setGameInfo}
            />
            {selectedGame && (
              <Images
                images={selectedGame.short_screenshots}
                isOpen={!!selectedGame}
                closeGallery={() => setSelectedGame(null)}
              />
            )}
          </div>
        }
      />
      <Route
        path="/game/:id"
        element={
          gameInfo && (
            <GameInfo
              game={gameInfo}
              onGameSelectinfo={setGameInfo}
              gameName={gameInfo.name}
              gameImage={gameInfo.background_image}
              gameRating={gameInfo.rating}
              gameReleased={gameInfo.released}
              gamePlatforms={gameInfo.platforms}
              gameMetacritic={gameInfo.metacritic}
              stores={gameInfo.stores}
              gameEsrb={gameInfo.esrb_rating ? gameInfo.esrb_rating.name : null}
            />
          )
        }
      />
    </Routes>
  );
}

export default App;
