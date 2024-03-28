import { useState } from "react";

function Images({ images, isOpen, closeGallery }) {
  if (!isOpen) return null;

  const [display, setDisplay] = useState(0);

  const next = () => {
    setDisplay((display + 1) % images.length); // Loop back to the start when reaching the end
  };

  const prev = () => {
    setDisplay((display - 1 + images.length) % images.length); // Loop back to the end when reaching the start
  };

  return (
    <>
      <div className="background-gallery" onClick={closeGallery}></div>
      <div className="gallery center">
        <div onClick={closeGallery} className="close-gallery">
          <img
            src="https://icongr.am/fontawesome/close.svg?size=128&color=000000"
            alt=""
          />
        </div>
        <div className="carousel-game-images center">
          <figure
            className="center "
            style={{
              display: "flex",
              transform: `translateX(-${display * 100}%)`,
              transition: "transform 0.5s ease-in-out", // Add this line
            }}
          >
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.image}
                alt={image.id}
                className="gallery-img"
              />
            ))}
          </figure>
          <button onClick={next} className="right-arrow">
            <img
              src="https://icongr.am/fontawesome/chevron-right.svg?size=16&color=ffffff"
              alt=""
            />
          </button>
          <button onClick={prev} className="left-arrow">
            <img
              src="https://icongr.am/fontawesome/chevron-left.svg?size=16&color=ffffff"
              alt=""
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Images;
