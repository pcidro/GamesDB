import React from "react";
import { Link } from "react-router-dom";
import "../css/notfound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Página não encontrada</p>
      <Link to="/" className="home-button">
        Volte para a home
      </Link>
    </div>
  );
};

export default NotFound;
