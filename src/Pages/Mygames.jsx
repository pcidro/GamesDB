import React from "react";
import "../css/mygames.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Mygames = () => {
  const [games, setGames] = useState([]);
  const [searchGame, setSearchGame] = useState("");

  const filteredGames = games.filter((game) => {
    return game.name.toLowerCase().trim().includes(searchGame.toLowerCase());
  });

  useEffect(() => {});

  useEffect(() => {
    const minhaLista = localStorage.getItem("@games");
    setGames(JSON.parse(minhaLista) || []);
  }, []);

  function removefromList(id) {
    const newList = games.filter((listGame) => listGame.id !== id);
    setGames(newList);
    localStorage.setItem("@games", JSON.stringify(newList));
  }

  return (
    <section className="container-my-games">
      <h1>Meus jogos</h1>

      {games.length === 0 && (
        <p className="nenhum-jogo">
          Você não possui nenhum jogo salvo.{" "}
          <Link to="/">Salve algum jogo!</Link>{" "}
        </p>
      )}

      <input
        type="text"
        placeholder="Buscar jogo..."
        value={searchGame}
        onChange={(e) => setSearchGame(e.target.value)}
        className="search-input"
      />
      <ul className="my-games-grid">
        {filteredGames.map((game) => (
          <li className="my-game-card" key={game.id}>
            <img
              src={game.background_image_additional}
              alt={`Capa do jogo ${game.name}`}
            />
            <div className="mygame-card-content">
              <h3>{game.name}</h3>
              <div className="card-actions">
                <Link to={`/jogo/${game.id}`}>Ver detalhes do jogo</Link>
                <button onClick={() => removefromList(game.id)}>
                  Remover da lista
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Mygames;
