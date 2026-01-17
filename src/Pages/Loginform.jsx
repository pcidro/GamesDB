import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import Ellie from "../assets/ellie.jpeg";
import "../css/loginform.css";

const Loginform = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <section className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <label htmlFor="usuario">Usuário</label>
        <input
          type="text"
          id="usuario"
          value={usuario}
          onChange={({ target }) => setUsuario(target.value)}
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={({ target }) => setSenha(target.value)}
        />
        <button>Entrar</button>
        <Link to="/perdeu">Perdeu a senha?</Link>

        <div className="cadastre-se">
          <h1>Cadastre-se</h1>
          <p>Ainda não possui conta? Cadastre-se no site</p>
          <Link to="/criar">Cadastro</Link>
        </div>
      </form>
    </section>
  );
};

export default Loginform;
