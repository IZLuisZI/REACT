import playstation from "./Game Store/Icons/PlayStation_logo.svg";
import epicgames from "./Game Store/Icons/Epic_Games_logo.svg";
import steam from "./Game Store/Icons/Steam.svg";
import xbox360 from "./Game Store/Icons/Xbox360.svg";
import xbox from "./Game Store/Icons/xbox.svg";
import googleplay from "./Game Store/Icons/googleplay.svg";
import appstore from "./Game Store/Icons/appstore.svg";
import eshop from "./Game Store/Icons/eshop.svg";
import gog from "./Game Store/Icons/gog.svg";
function Stores({ stores }) {
  return (
    <section className="game-available-stores">
      <h2>Available Stores</h2>

      <article className="store-list">
        {stores.map((store) => (
          <a
            href={`https://${store.store.domain}`}
            target="_blank"
            key={store.store.id}
          >
            <img
              src={
                store.store.name === "PlayStation Store"
                  ? playstation
                  : store.store.name === "Epic Games"
                  ? epicgames
                  : store.store.name === "Steam"
                  ? steam
                  : store.store.name === "Xbox 360 Store"
                  ? xbox360
                  : store.store.name === "Xbox Store"
                  ? xbox
                  : store.store.name === "Google Play"
                  ? googleplay
                  : store.store.name === "App Store"
                  ? appstore
                  : store.store.name === "Nintendo Store"
                  ? eshop
                  : store.store.name === "GOG"
                  ? gog
                  : null
              }
              alt={store.store.name}
            />
          </a>
        ))}
      </article>
    </section>
  );
}
export default Stores;
