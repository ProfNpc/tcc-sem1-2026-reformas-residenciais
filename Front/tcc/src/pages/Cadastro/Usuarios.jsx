import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styleUsuario.css";

function Usuarios() {

  const location = useLocation();
  const navigate = useNavigate();

  // Recebe o ID que veio do cadastro
  const idPrestador = location.state?.idPrestador;
  const idCliente = location.state?.idCliente;

  // Define automaticamente o tipo
  const [tipo, setTipo] = useState(
    idCliente ? "cliente" : "prestador"
  );

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [foto, setFoto] = useState(null);

  function handleFotoChange(e) {

    const arquivo = e.target.files[0];

    if (arquivo) {
      setFoto(URL.createObjectURL(arquivo));
    }
  }

  async function handleSalvar(e) {

    e.preventDefault();

    // Verifica o ID conforme o tipo
    if (tipo === "prestador" && !idPrestador) {
      alert("ID do prestador não encontrado.");
      console.error("ID do prestador:", idPrestador);
      return;
    }

    if (tipo === "cliente" && !idCliente) {
      alert("ID do cliente não encontrado.");
      console.error("ID do cliente:", idCliente);
      return;
    }

    if (!usuario || !senha || !confirmarSenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8089/Usuarios",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            // Se for prestador, envia o ID do prestador
            // Se for cliente, envia null
            idPrestador: tipo === "prestador"
              ? idPrestador
              : null,

            // Se for cliente, envia o ID do cliente
            // Se for prestador, envia null
            idCliente: tipo === "cliente"
              ? idCliente
              : null,

            usuarioCriado: usuario,

            senhaCriada: senha,

            tipoUsuario: tipo

          })
        }
      );

      if (!response.ok) {

        const erro = await response.text();

        console.error("Erro do backend:", erro);

        throw new Error("Erro ao salvar usuário");

      }

      const data = await response.json();

      console.log("Usuário salvo:", data);

      alert("Prestador cadastrado com sucesso!");

      setUsuario("");
      setSenha("");
      setConfirmarSenha("");
      setFoto(null);

      navigate("/");

    } catch (error) {

      console.error("Erro:", error);

      alert("Erro ao cadastrar usuário");

    }
  }

  return (

    <div className="pagina">

      <div className="card">

        <div className="logo">
          <span className="logo-icon">🏗️</span> ReformaJá
        </div>

        <h2 className="titulo">
          Dados de Acesso
        </h2>

        {/* Mostra o ID correspondente */}
        <p>
          {tipo === "prestador"
            ? `ID Prestador: ${idPrestador}`
            : `ID Cliente: ${idCliente}`
          }
        </p>

        <form onSubmit={handleSalvar}>

          <label
            className="foto-label"
            htmlFor="foto-perfil"
          >

            <div className="foto-circulo">

              {foto ? (

                <img
                  src={foto}
                  alt="Foto de perfil"
                  className="foto-img"
                />

              ) : (

                <span className="foto-placeholder">
                  +
                </span>

              )}

            </div>

            <span className="foto-texto">
              Adicionar foto
            </span>

          </label>

          <input
            id="foto-perfil"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="foto-input"
          />

          <div className="input-group">

            <label>
              CRIAR USUÁRIO
            </label>

            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              TIPO DE USUÁRIO
            </label>

            <select
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value)
              }
              required
            >

              <option value="cliente">
                Cliente
              </option>

              <option value="prestador">
                Prestador
              </option>

            </select>

          </div>

          <div className="input-group">

            <label>
              CRIAR SENHA
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              CONFIRMAR SENHA
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) =>
                setConfirmarSenha(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn"
          >
            SALVAR
          </button>

        </form>

      </div>

    </div>
  );
}

export default Usuarios;
