import React, { useEffect, useState } from "react";
import Images from "./Images.jsx";
import GameRatingCard from "./gameratingcard";
import metacritic from "./ratings/1.png";
import star from "./ratings/star.svg";
import Mature from "./ratings/esrb ratings/Mature.svg";
import Everyone10 from "./ratings/esrb ratings/Everyone_10+.svg";
import Teen from "./ratings/esrb ratings/Teen.svg";
import Everyone from "./ratings/esrb ratings/Everyone.svg";
import like from "./ratings/UserRate/like.svg";
import dislike from "./ratings/UserRate/dislike.svg";

import Footer from "./footer.jsx";
import Stores from "./Store.jsx";
import Hltb from "./howlongtobeat.jsx";

function GameInfo({
  game,
  gameName,
  gameImage,
  gameRating,
  gameMetacritic,
  gameEsrb,
  stores,
}) {
  const [gallery, setSelectedGame] = useState(false);
  const [likedGame, setlikeGame] = useState(false);
  const [dislikedGame, setdislikeGame] = useState(false);

  const [hltbData, setHltbData] = useState(null);

  const server = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Encode the gameName to be URL-safe
    const encodedGameName = encodeURIComponent(sliceParenthesis(gameName));

    // Fetch the data from the server
    fetch(`${server}/games/game/${encodedGameName}`)
      .then((response) => response.json())
      .then((data) => {
        setHltbData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    window.scrollTo(0, 0);
  }, [gameName]);
  function sliceParenthesis(string) {
    return string.split("(")[0];
  }

  function backhome() {
    window.location.href = "/";
  }

  function changelikestatus() {
    const newLikedGameStatus = !likedGame;
    setlikeGame(newLikedGameStatus);
    localStorage.setItem("likedGame", newLikedGameStatus);
    if (dislikedGame) {
      const newDislikedGameStatus = !dislikedGame;
      setdislikeGame(newDislikedGameStatus);
      localStorage.setItem("dislikedGame", newDislikedGameStatus);
    }
  }

  function changedislikestatus() {
    const newDislikedGameStatus = !dislikedGame;
    setdislikeGame(newDislikedGameStatus);
    localStorage.setItem("dislikedGame", newDislikedGameStatus);
    if (likedGame) {
      const newLikedGameStatus = !likedGame;
      setlikeGame(newLikedGameStatus);
      localStorage.setItem("likedGame", newLikedGameStatus);
    }
  }
  return (
    <div className="game-info-container" key={gameName}>
      <figure className="game-background">
        <img src={gameImage} alt={gameName} />
      </figure>
      <div className="game-info">
        <article>
          <div className="game-image">
            <img className="main-image-game" src={gameImage} alt={gameName} />
          </div>
          <section className="game-description">
            <h1>{gameName}</h1>
            <div className="game-platforms">
              <span className="platforms">
                <strong>Platforms: </strong>{" "}
              </span>
              {game.platforms.map((platform) => (
                <span
                  className="platform"
                  data-platform={platform.platform.name}
                  key={platform.platform.id}
                >
                  {platform.platform.name + " "}
                </span>
              ))}
            </div>{" "}
            <div className="game-ratings">
              <GameRatingCard
                gamerating={gameRating}
                icon={star}
                className={"metacritic"}
                descrition={"General Rating"}
              />
              <GameRatingCard
                gamerating={gameMetacritic}
                icon={metacritic}
                className={"metacritic"}
                descrition={"Metacritic Rating"}
              />
              {gameEsrb === "Mature" && (
                <GameRatingCard
                  gamerating={gameEsrb}
                  icon={
                    gameEsrb === "Mature"
                      ? Mature
                      : gameEsrb === "Everyone 10+"
                      ? Everyone10
                      : gameEsrb === "Teen"
                      ? Teen
                      : gameEsrb === "Everyone"
                      ? Everyone
                      : null
                  }
                  className={"metacritic"}
                  descrition={"Esrb Rating"}
                />
              )}
            </div>
            <div className="more-game-controls">
              <div className="Like-dislike-container">
                <div
                  style={{ backgroundColor: likedGame ? "green" : "" }}
                  className="like"
                  onClick={() => changelikestatus()}
                >
                  <img className={"icon-descriptior"} src={like} alt="Like" />
                </div>
                <div
                  style={{ backgroundColor: dislikedGame ? "red" : "" }}
                  className="dislike"
                  onClick={() => changedislikestatus()}
                >
                  <img
                    className={"icon-descriptior"}
                    src={dislike}
                    alt="Dislike"
                  />
                </div>
              </div>
              <span
                onClick={() => setSelectedGame(true)}
                className="see-screenshots"
              >
                See screenshots
              </span>
            </div>
          </section>
        </article>
      </div>
      <Hltb hltbData={hltbData} />
      <Stores stores={stores} />
      <Footer />
      <Images
        images={game.short_screenshots}
        isOpen={gallery}
        closeGallery={() => setSelectedGame(null)}
      />

      <div onClick={() => backhome()} className="back-home">
        Go back home
      </div>
    </div>
  );
}
export default GameInfo;
