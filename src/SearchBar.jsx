import React, { useState, useEffect } from "react";
import "./styles.css";

const SearchBar = ({ onSearch, putSearch, setGames }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setSuggestions(data.results.map((game) => game.name)))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const updategames = (search) => {
    try {
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}`)
        .then((response) => response.json())
        .then((data) => {
          setGames(data.results);
          setSuggestions(data.results.map((game) => game.name));
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
    setIsFocused(false);

    updategames(searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <form className="search" onSubmit={handleFormSubmit}>
      <input
        className="color-sheme"
        type="text"
        placeholder="Search for a game..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <button className="search-game color-sheme" type="submit">
        Search
      </button>
      <div
        className="suggestions"
        style={{ display: isFocused ? "block" : "none" }}
      >
        {suggestions
          .filter(
            (suggestion) =>
              suggestion.toLowerCase().includes(searchTerm.toLowerCase()) &&
              suggestion.toLowerCase() !== searchTerm.toLowerCase()
          )
          .slice(0, 10)
          .map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </div>
          ))}
      </div>
    </form>
  );
};

export default SearchBar;
