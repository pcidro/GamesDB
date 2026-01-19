import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getPopularGames } from "../api";
import "../css/home.css";
import { GlobalContext } from "../GlobalContext";
import { searchGames } from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useContext(GlobalContext);
  useEffect(() => {
    async function fetchGames() {
      let data;
      try {
        if (query) {
          data = await searchGames(query);
        } else {
          data = await getPopularGames();
        }
        if (data) setGames(data);
      } catch (error) {
        console.error("erro ao buscar os jogos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, [query]);

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
    </div>
  );
};

export default Home;
