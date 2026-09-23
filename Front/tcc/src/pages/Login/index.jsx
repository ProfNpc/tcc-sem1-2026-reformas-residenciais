import { useState } from 'react'
import { Link } from 'react-router-dom'
import './stylelogin.css'

import PesID from '../PesquisaGeral'
import Footer from '../../components/footer'
import { useNavigate } from "react-router-dom";


function index() {

  const [tipo, setTipo] = useState('cliente')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [pegausu, setpegausu] = useState('')
  const navigate = useNavigate();

  // ALTERAÇÃO: função de login
  async function handleLogin(e) {

    e.preventDefault();

    // LOGIN DO ADMINISTRADOR
    if (tipo === "adm") {

      if (usuario === "admin" && senha === "refores") {
        navigate("../PesquisaGeral");
        return;
      }

      alert("Usuário ou senha inválidos");
      return;
    }

    try {

      // Busca os usuários cadastrados
      const responseUsuarios = await fetch(
        "http://127.0.0.1:8089/Usuarios"
      );

      if (!responseUsuarios.ok) {
        throw new Error("Erro ao consultar usuários");
      }

      const usuarios = await responseUsuarios.json();

      let usuarioEncontrado = null;

      // =====================================================
      // 1 - VERIFICA SE FOI DIGITADO O USUÁRIO
      // =====================================================

      usuarioEncontrado = usuarios.find(
        (item) =>
          item.usuarioCriado?.toLowerCase() ===
          usuario.toLowerCase()
      );


      // =====================================================
      // 2 - SE NÃO ENCONTROU, VERIFICA SE FOI DIGITADO EMAIL
      // =====================================================

      if (!usuarioEncontrado) {

        let responseCadastro;

        if (tipo === "cliente") {

          responseCadastro = await fetch(
            "http://127.0.0.1:8089/Pessoa"
          );

        } else {

          responseCadastro = await fetch(
            "http://127.0.0.1:8089/Prestador"
          );

        }

        if (!responseCadastro.ok) {
          throw new Error("Erro ao consultar cadastro");
        }

        const cadastros = await responseCadastro.json();

        const cadastroEncontrado = cadastros.find(
          (item) =>
            item.email?.toLowerCase() ===
            usuario.toLowerCase()
        );


        // =====================================================
        // 3 - ENCONTROU O EMAIL
        // =====================================================

        if (cadastroEncontrado) {

          if (tipo === "cliente") {

            usuarioEncontrado = usuarios.find(
              (item) =>
                item.idCliente === cadastroEncontrado.id &&
                item.tipoUsuario === "cliente"
            );

          } else {

            usuarioEncontrado = usuarios.find(
              (item) =>
                item.idPrestador === cadastroEncontrado.id &&
                item.tipoUsuario === "prestador"
            );

          }

        }

      }


      // =====================================================
      // 4 - USUÁRIO OU EMAIL NÃO ENCONTRADO
      // =====================================================

      if (!usuarioEncontrado) {

        alert("Usuário ou e-mail não encontrado");

        return;
      }


      // =====================================================
      // 5 - VERIFICA O TIPO
      // =====================================================

      const tipoEsperado =
        tipo === "cliente"
          ? "cliente"
          : "prestador";


      if (usuarioEncontrado.tipoUsuario !== tipoEsperado) {

        alert("Usuário não pertence ao tipo selecionado");

        return;
      }


      // =====================================================
      // 6 - VERIFICA A SENHA
      // =====================================================

      if (usuarioEncontrado.senhaCriada !== senha) {

        alert("Senha incorreta");

        return;
      }


      // =====================================================
      // 7 - LOGIN REALIZADO
      // =====================================================

      alert("Login realizado com sucesso!");

      navigate("/");

    } catch (error) {

      console.error("Erro no login:", error);

      alert("Erro ao realizar login");

    }
  }


  return (
    <div
      id="body-context"
      className={`login-page ${
        tipo === 'cliente'
          ? 'theme-cliente'
          : tipo === 'pro'
          ? 'theme-pro'
          : 'theme-adm'
      }`}
    >

      {/* TOPO DINÂMICO */}
      <div className="topo">

        {tipo === 'cliente' ? (
          <>
            <h1 className="topocliente">
              Transforme sua casa com profissionais de confiança
            </h1>

            <p className="topoclientep">
              A plataforma que conecta sua obra aos melhores especialistas da sua região.
            </p>
          </>
        ) : (
          <>
            <h1 className="topoprofissional">
              A plataforma que conecta o especialista com o cliente.
            </h1>

            <p className="topoclientep">
              Encontre oportunidades de trabalho na sua região.
            </p>
          </>
        )}

      </div>


      {/* CAIXA LOGIN */}
      <div className="login-container">

        {/* LOGO */}
        <div className="logo">
          <span className="logo-icon">🏗️</span> ReformaJá
        </div>


        {/* TABS */}
        <div className="tabs">

          <div
            className={`tab ${
              tipo === 'cliente' ? 'active' : ''
            }`}
            onClick={() => setTipo('cliente')}
          >
            SOU CLIENTE
          </div>

          <div
            className={`tab ${
              tipo === 'pro' ? 'active' : ''
            }`}
            onClick={() => setTipo('pro')}
          >
            SOU PROFISSIONAL
          </div>

          <div
            className={`tab ${
              tipo === 'adm' ? 'active' : ''
            }`}
            onClick={() => setTipo('adm')}
          >
            SOU ADMINISTRADOR
          </div>

        </div>


        {pegausu && (
          <p
            style={{
              color: 'red',
              marginBottom: '10px'
            }}
          >
            {pegausu}
          </p>
        )}


        {/* FORM */}
        <div className="form-content">

          <div className="header-text">

            {tipo === 'cliente' ? (
              <>
                <h2>Olá, Morador!</h2>
                <p>
                  Acompanhe a evolução da sua obra em tempo real.
                </p>
              </>
            ) : tipo === 'pro' ? (
              <>
                <h2>Olá, Profissional!</h2>
                <p>
                  Encontre novas oportunidades de trabalho.
                </p>
              </>
            ) : (
              <>
                <h2>Olá, Administrador!</h2>
                <p>
                  Gerencie seu sistema.
                </p>
              </>
            )}

          </div>


          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>
                E-MAIL OU USUARIO
              </label>

              <input
                type="text"
                placeholder="Digite seus dados"
                value={usuario}
                onChange={(e) =>
                  setUsuario(e.target.value)
                }
                required
              />

            </div>


            <div className="input-group">

              <label>
                SENHA
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


            <button
              type="submit"
              className="btn"
            >
              {tipo === 'cliente'
                ? 'ACESSAR MINHA OBRA'
                : tipo === 'pro'
                ? 'ACESSAR PAINEL'
                : 'GERENCIAR O SISTEMA'}
            </button>

          </form>


          {tipo == 'cliente' && (

            <nav
              className='linkCadastro'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
                marginBottom: "2px",
                color: "green",
              }}
            >

              <Link
                to="/Cadastro/cliente"
                style={{
                  color: "blue",
                  textDecoration: "green",
                  fontSize: "15px",
                }}
              >
                CADASTRE-SE
              </Link>

            </nav>

          )}


          {tipo == 'pro' && (

            <nav
              className='linkCadastro'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
                marginBottom: "2px",
                color: "green",
              }}
            >

              <Link
                to="/cadastro/prestador/pro"
                style={{
                  color: "blue",
                  textDecoration: "green",
                  fontSize: "15px",
                }}
              >
                CADASTRE-SE
              </Link>

            </nav>

          )}


          {/* FOOTER */}
          <div className="footer">

          </div>

        </div>

      </div>

      <Footer />

    </div>
  )
}

export default index;
