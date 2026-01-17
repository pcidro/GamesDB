import React from "react";
import PlusIcon from "../assets/plus.svg?react";
import "../css/header.css";
import Input from "./Input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="header-bg">
      <header className="header-container">
        <div>
          <Link className="gamevault-logo" to="/">
            GAME<span className="vault-destaque">VAULT</span>
          </Link>
          <p className="subtitle-header">
            Adcione e ranqueie seus jogos favoritos
          </p>
        </div>
        <Input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Digite um jogo..."
        />
        <button className="my-game">
          <PlusIcon />
          MY GAMES
        </button>
      </header>
    </div>
  );
};
export default Header;
