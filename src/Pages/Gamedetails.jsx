import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadGame } from "../api";
import { Link } from "react-router-dom";
import "../css/gamedetails.css";
import { GlobalContext } from "../GlobalContext";
import Modal from "../Components/Modal";
import Stars from "../Components/Stars";

const Gamedetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const { usuario, loading } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@games");
    const gamesSalvos = JSON.parse(minhaLista) || [];
    const gameSalvo = gamesSalvos.find((g) => g.id === game?.id);

    if (gameSalvo) {
      setIsSaved(true);
      if (gameSalvo.userRating) {
        setUserRating(gameSalvo.userRating);
      }
    } else {
      setIsSaved(false);
      setUserRating(0);
    }
  }, [game]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadGame(id);
      setGame(data);
    }
    fetchData();
  }, [id]);

  if (!game) {
    return <p className="game-loading">Carregando detalhes do jogo...</p>;
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
    alert("Jogo salvo com sucesso!");
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

  function handleRating() {
    const minhaLista = localStorage.getItem("@games");
    let gamesSalvos = JSON.parse(minhaLista) || [];
    const index = gamesSalvos.findIndex((g) => g.id === game.id);

    if (index !== -1) {
      gamesSalvos[index].userRating = userRating;
    } else {
      const novoJogoComNota = { ...game, userRating: userRating };
      gamesSalvos.push(novoJogoComNota);
      setIsSaved(true);
    }

    localStorage.setItem("@games", JSON.stringify(gamesSalvos));
    setOpenModal(false);
    alert("Avaliação salva!");
  }

  if (loading) return null;

  return (
    <section className="game-details-section">
      <div className="game-background-wrapper">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-background-image"
        />
        <div className="game-background-overlay"></div>
      </div>

      <div className="game-details-container">
        <div className="game-details-content">
          <div className="game-poster-wrapper">
            <img
              src={game.background_image}
              alt={`Capa de ${game.name}`}
              className="game-poster"
            />
          </div>

          <div className="game-info-wrapper">
            <h1 className="game-title">{game.name}</h1>

            <div className="game-ratings">
              {game.rating && (
                <div className="rating-item">
                  <span className="rating-label">RATING</span>
                  <div className="rating-value">
                    <span className="rating-star">★</span>
                    <span className="rating-number">{game.rating}</span>
                    <span className="rating-max">/5</span>
                  </div>
                </div>
              )}

              {userRating > 0 && (
                <div className="rating-item">
                  <span className="rating-label">SUA AVALIAÇÃO</span>
                  <div className="rating-value">
                    <span className="user-rating-star">★</span>
                    <span className="user-rating-number">{userRating}</span>
                    <span className="rating-max">/5</span>
                  </div>
                </div>
              )}
            </div>

            {game.genres && game.genres.length > 0 && (
              <div className="game-genres">
                {game.genres.slice(0, 5).map((genre) => (
                  <span key={genre.id} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="game-meta">
              {game.released && (
                <div className="meta-item">
                  <span className="meta-label">Lançamento</span>
                  <span className="meta-value">{game.released}</span>
                </div>
              )}

              {game.developers && game.developers[0] && (
                <div className="meta-item">
                  <span className="meta-label">Desenvolvedor</span>
                  <span className="meta-value">{game.developers[0].name}</span>
                </div>
              )}
            </div>

            {game.description_raw && (
              <p className="game-description">
                {game.description_raw.slice(0, 414)}
              </p>
            )}

            <div className="game-actions">
              {usuario ? (
                <>
                  {isSaved ? (
                    <button onClick={removeGame} className="btn-remove-game">
                      Remover dos meus jogos
                    </button>
                  ) : (
                    <button onClick={saveGame} className="btn-add-game">
                      Adicionar aos meus jogos
                    </button>
                  )}
                  <button
                    onClick={() => setOpenModal(true)}
                    className="btn-rate-game"
                  >
                    Rankear jogo
                  </button>
                </>
              ) : (
                <p className="login-prompt">
                  Faça <Link to="/login">Login</Link> ou{" "}
                  <Link to="/login/criar">Crie</Link> uma conta para rankear
                  seus jogos.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal onClose={() => setOpenModal(false)} isOpen={openModal}>
        <h2 className="modal-title">O que você achou de {game.name}?</h2>
        <div className="modal-stars">
          <Stars value={userRating} onChange={setUserRating} />
        </div>
        <button onClick={handleRating} className="btn-submit-rating">
          Enviar avaliação
        </button>
      </Modal>
    </section>
  );
};

export default Gamedetails;
