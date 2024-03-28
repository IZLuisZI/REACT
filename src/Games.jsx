/* This code snippet is a React component named `Games`. Here's a breakdown of what it does: */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styles.css";
import { Link } from "react-router-dom";
/* This `Games` component in React is responsible for fetching a list of games from the Rawg API and
displaying them in a user interface. Here's a breakdown of what the component does: */
function Games({ games, searchTerm, onGameSelect, onGameSelectinfo }) {
  return (
    <>
      <div className="games-container">
        {games
          .filter((game) =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((game) => (
            <div key={game.id} className="game">
              {game.background_image && (
                <div key={game.id} className="img-container">
                  <LazyLoadImage
                    className="game-img"
                    src={game.background_image}
                    alt={game.name}
                    effect="blur"
                    key={game.name}
                  />
                  <div key={game.id} className="see-images">
                    <span id="spawn-gallery" onClick={() => onGameSelect(game)}>
                      See more images
                    </span>
                  </div>
                </div>
              )}

              <div className="description">
                <Link to={`/game/${game.name}`}>
                  <h2 onClick={() => onGameSelectinfo(game)}>{game.name}</h2>
                </Link>
                <h3>Platforms:</h3>
                <div className="plaforms">
                  {game.platforms.map((platform) => (
                    <span
                      className="platform"
                      data-platform={platform.platform.name}
                      key={platform.platform.id}
                    >
                      {platform.platform.name + " "}
                    </span>
                  ))}
                </div>

                <div className="more_about_games">
                  <div className="release">
                    Release date: <span>{game.released}</span>
                  </div>
                  <div className="rating">
                    Rating:{" "}
                    <span title={game.rating + " stars"}>
                      {game.rating}{" "}
                      <img
                        src="https://icongr.am/fontawesome/star.svg?size=62&color=ffffff"
                        alt="rating star"
                      />
                    </span>
                  </div>
                  <div className="genres">
                    Genres:{" "}
                    <span>
                      {game.genres.map((genre) => genre.name).join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {games.length === 0 && <div className="spinner"></div>}
    </>
  );
}

export default Games;
