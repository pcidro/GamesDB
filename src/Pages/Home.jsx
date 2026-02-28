import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getPopularGames } from "../api";
import "../css/home.css";
import { GlobalContext } from "../GlobalContext";
import { searchGames } from "../api";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalGames, setTotalGames] = useState(0);
  const { query, page, setPage } = useContext(GlobalContext);
  useEffect(() => {
    if (location.pathname === "/") {
      setPage(1);
    }
  }, [location.pathname]);
  useEffect(() => {
    async function fetchGames() {
      let data;
      try {
        if (query) {
          data = await searchGames(query);
        } else {
          data = await getPopularGames(page);
        }
        if (data) {
          setGames(data.results);
          setTotalGames(data.count);
        }

        window.scrollTo(0, 0);
      } catch (error) {
        console.error("erro ao buscar os jogos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, [query, page]);

  const renderPagination = () => {
    const pageSize = 30;
    const totalPages = Math.min(Math.ceil(totalGames / pageSize), 100);
    const pages = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? "page-btn-active" : "page-btn"}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  if (loading) {
    return <div className="loading">Carregando jogos...</div>;
  }
  return (
    <div className="container-home">
      <h1>Jogos populares</h1>
      <ul className="grid-games">
        {games.map((game) => (
          <li className="game-card" key={game.id}>
            <div className="image-container">
              <img
                className="img-card"
                src={game.background_image}
                alt={game.name}
              />
            </div>
            <div className="card-content">
              <div className="card-info">
                <h3>{game.name}</h3>
                {game.rating && <span className="rating">★ {game.rating}</span>}
                <Link to={`/jogo/${game.id}`} className="btn-details">
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &laquo;
        </button>
        {renderPagination()}

        <button onClick={() => setPage(page + 1)}>&raquo;</button>
      </div>
    </div>
  );
};

export default Home;
