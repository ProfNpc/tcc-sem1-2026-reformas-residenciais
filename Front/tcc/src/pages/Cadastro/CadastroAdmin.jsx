import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleUsuario.css";

function CadastroAdmin() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleSalvar(e) {

    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8089/Admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
          })
        }
      );

      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro do backend:", erro);
        throw new Error("Erro ao cadastrar administrador.");
      }

      alert("Administrador cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

      navigate("/");

    } catch (error) {

      console.error("Erro:", error);
      alert("Erro ao realizar cadastro do administrador.");

    }
  }

  return (

    <div className="pagina">

      <div className="card">

        <div className="logo">
          <span className="logo-icon">🏗️</span> ReformaJá
        </div>

        <h2 className="titulo">
          Cadastro de Administrador
        </h2>

        <form onSubmit={handleSalvar}>

          <div className="input-group">

            <label>NOME</label>

            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>E-MAIL</label>

            <input
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>CRIAR SENHA</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>CONFIRMAR SENHA</label>

            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />

          </div>

          <button type="submit" className="btn">
            CADASTRAR ADMINISTRADOR
          </button>

        </form>

      </div>

    </div>
  );
}

export default CadastroAdmin;