import React, { useContext } from "react";
import PlusIcon from "../assets/plus.svg?react";
import "../css/header.css";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Logout from "../assets/logout.svg?react";

const Header = () => {
  const { search, setSearch, setQuery, page, setPage } =
    useContext(GlobalContext);
  const { usuario, loading } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleHome(e) {
    e.preventDefault();
    setSearch("");
    setQuery("");
    setPage(1);
    navigate("/");
  }

  function handleLogout() {
    try {
      signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }
  if (loading) return null;
  return (
    <div className="header-bg">
      <header className="header-container">
        <div>
          <Link className="gamevault-logo" to="/" onClick={handleHome}>
            GAMES<span className="vault-destaque">DB</span>
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
        {usuario ? (
          <>
            <Link to="/meus-jogos" className="my-game">
              MY GAMES
              <PlusIcon />
            </Link>
          </>
        ) : (
          <Link className="my-game" to="/login">
            LOGIN / CADASTRO
          </Link>
        )}
        {usuario && (
          <button onClick={handleLogout} className="logout">
            <Logout />
            Sair
          </button>
        )}
      </header>
    </div>
  );
};
export default Header;
