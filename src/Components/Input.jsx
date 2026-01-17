import React from "react";
import SearchIcon from "../assets/search.svg?react";
import "../css/input.css";

const Input = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-wrapper">
      <SearchIcon className="search-icon-img" />
      <input
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
