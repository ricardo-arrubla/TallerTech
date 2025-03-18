import React from "react";
import "../Estilos/SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => (
  <input
    className="search-bar"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default SearchBar;
