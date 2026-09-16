import React, { useState } from "react";
import "./style.css";

function Index() {
  const [usuario, setUsuario] = useState("");
  const [tipo, setTipo] = useState("cliente");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [foto, setFoto] = useState(null);

  function handleFotoChange(e) {
    const arquivo = e.target.files[0];
    if (arquivo) {
      setFoto(URL.createObjectURL(arquivo));
    }
  }

  function handleSalvar(e) {
    e.preventDefault();

    if (!usuario || !senha || !confirmarSenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    console.log({ usuario, tipo, senha });
    // Aqui depois você liga na API
  }

  return (
    <div className="pagina">
      <div className="card">

        <div className="logo">
          <span className="logo-icon">🏗️</span> ReformaJá
        </div>

        <h2 className="titulo">Dados de Acesso</h2>

        <form onSubmit={handleSalvar}>

          <label className="foto-label" htmlFor="foto-perfil">
            <div className="foto-circulo">
              {foto ? (
                <img src={foto} alt="Foto de perfil" className="foto-img" />
              ) : (
                <span className="foto-placeholder">+</span>
              )}
            </div>
            <span className="foto-texto">Adicionar foto</span>
          </label>
          <input
            id="foto-perfil"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="foto-input"
          />

          <div className="input-group">
            <label>CRIAR USUÁRIO</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>TIPO DE USUÁRIO</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="cliente">Cliente</option>
              <option value="prestador">Prestador</option>
            </select>
          </div>

          <div className="input-group">
            <label>CRIAR SENHA</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>CONFIRMAR SENHA</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            SALVAR
          </button>

        </form>
      </div>
    </div>
  );
}

export default Index;