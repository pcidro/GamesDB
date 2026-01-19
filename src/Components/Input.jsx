import React, { useContext } from "react";
import SearchIcon from "../assets/search.svg?react";
import "../css/input.css";
import { GlobalContext } from "../GlobalContext";

const Input = ({ value, onChange, placeholder }) => {
  const { setQuery } = useContext(GlobalContext);
  function handleSubmit(e) {
    e.preventDefault();
    setQuery(value);
  }

  return (
    <form onClick={handleSubmit} className="search-wrapper">
      <button type="submit" className="search-button-style">
        <SearchIcon className="search-icon-img" />
      </button>
      <input
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default Input;
