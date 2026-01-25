import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadGame } from "../api";
import { Link } from "react-router-dom";
import "../css/gamedetails.css";
import { GlobalContext } from "../GlobalContext";
import Modal from "../Components/Modal";

const Gamedetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const { usuario, loading } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@games");
    const gamesSalvos = JSON.parse(minhaLista) || [];
    const hasGame = gamesSalvos.some((gameSalvo) => gameSalvo.id === game?.id);
    setIsSaved(hasGame);
  }, [game]);

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

  function saveGame() {
    const minhaLista = localStorage.getItem("@games");

    let gamesSalvos = JSON.parse(minhaLista) || [];

    const hasGame = gamesSalvos.some((gamesalvo) => {
      return gamesalvo.id === game.id;
    });

    if (hasGame) return;
    gamesSalvos.push(game);
    localStorage.setItem("@games", JSON.stringify(gamesSalvos));
    setIsSaved(true);
    alert("Jogo Salvo com sucesso!");
  }

  function removeGame() {
    const minhaLista = localStorage.getItem("@games");
    let gamesSalvos = JSON.parse(minhaLista) || [];

    const novaLista = gamesSalvos.filter(
      (gameSalvo) => gameSalvo.id !== game.id,
    );

    localStorage.setItem("@games", JSON.stringify(novaLista));
    setIsSaved(false);
    alert("Jogo removido da lista!");
  }

  if (loading) return null;
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
            {usuario ? (
              <>
                {isSaved ? (
                  <button onClick={removeGame} className="btn-remove">
                    Remover dos meus jogos
                  </button>
                ) : (
                  <button onClick={saveGame} className="btn-add">
                    Adcionar aos meus jogos
                  </button>
                )}
                <button onClick={() => setOpenModal(true)} className="btn-rank">
                  Rankear Jogo
                </button>
              </>
            ) : (
              <p className="login-message">
                Faça <Link to="/login">Login</Link> ou{" "}
                <Link to="/login/criar">Crie</Link> uma conta para rankear seus
                jogos.
              </p>
            )}
            <Modal onClose={() => setOpenModal(false)} isOpen={openModal}>
              <h2>O que você achou de {game.name}? </h2>
              <p>Teste modal</p>
            </Modal>
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
