import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadGame } from "../api";
import { Link } from "react-router-dom";
import "../css/gamedetails.css";

const Gamedetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await loadGame(id);
      setGame(data);
    }
    fetchData();
  }, [id]);

  if (!game) {
    return <p className="carregando-jogo">Carregando detalhes do jogo...</p>;
  }

  return (
    <section className="game-hero">
      <div className="hero-background">
        <img src={game.background_image} alt={`Background de ${game.name}`} />
        <div className="hero-overlay"></div>
      </div>
      <div className="content-wrapper">
        <div className="game-info">
          <div className="badges">
            {game.genres?.slice(0, 3).map((genre) => (
              <span key={genre.id} className="badge">
                {genre.name}
              </span>
            ))}
            {game.rating && (
              <span className="badge rating">{game.rating} ★</span>
            )}
          </div>
          <h1>{game.name}</h1>
          <div className="infos">
            {game.released && (
              <span>
                <strong>Lançamento:</strong> {game.released}
              </span>
            )}
            {game.developers && game.developers[0] && (
              <span>
                <strong>Desenvolvido por:</strong> {game.developers[0].name}
              </span>
            )}
          </div>
          <p className="description">{game.description_raw?.slice(0, 414)}</p>
          <div className="actions">
            <Link className="btn-add">Adicionar aos meus jogos</Link>
            <Link className="btn-rank">Rankear Jogo</Link>
          </div>
        </div>
      </div>
      <div className="visual-card">
        <img src={game.background_image} alt={`Capa de ${game.name}`} />
      </div>
    </section>
  );
};

export default Gamedetails;
