import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const LoginCreate = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  async function handleCadastro(e) {
    setLoading(true);
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setErro("Senhas não coincidem. Tente novamente!");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está em uso.");
      } else if (error.code === "auth/invalid-email") {
        setErro("O formato do e-mail é inválido.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha é muito fraca.");
      } else {
        setErro("Ocorreu um erro ao criar a conta. Tente novamente.");
      }
      console.error(error.code);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-container">
      <div className="form-wrapper">
        <form className="login-form" on onSubmit={handleCadastro}>
          <div className="form-header">
            <h1>Cadastre-se</h1>
            <p>Embarque nessa aventura</p>
          </div>
          <div className="input-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={({ target }) => setSenha(target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Confirmar Senha</label>
            <input
              type="password"
              id="senha"
              value={confirmarSenha}
              onChange={({ target }) => setConfirmarSenha(target.value)}
              placeholder="Digite sua senha novamente"
              required
            />
          </div>
          {erro && <p style={{ color: "red", marginBottom: "1rem" }}>{erro}</p>}
          <button className="entrar">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <div className="cadastre-se">
            <p>
              Já tem Login? <Link to="/login">Fazer Login</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginCreate;
