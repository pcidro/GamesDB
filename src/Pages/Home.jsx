import React from "react";
import { useEffect, useState } from "react";
import { getPopularGames } from "../api";
import "../css/home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function fetchGames() {
      const data = await getPopularGames();
      if (data) {
        setGames(data);
      }
    }
    fetchGames();
  }, []);
  return (
    <div className="container-home">
      <h1>Jogos populares</h1>
      <ul className="grid-games">
        {games.map((game) => (
          <li className="game-card" key={game.id}>
            <img
              className="img-card"
              src={game.background_image}
              alt={game.name}
            />
            <h3>{game.name}</h3>
            <button>Ver Detalhes</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
