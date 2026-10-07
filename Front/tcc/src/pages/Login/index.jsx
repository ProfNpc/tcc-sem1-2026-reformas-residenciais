import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './stylelogin.css'

import Footer from '../../components/footer'


function index() {

  const [tipo, setTipo] = useState('cliente')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()


  // =====================================================
  // BUSCA OS DADOS DO CADASTRO
  // =====================================================

  async function buscarCadastro(usuarioEncontrado, tipo) {

    if (tipo === "cliente") {

      const responsePessoa =
        await fetch(
          "http://127.0.0.1:8089/Pessoa"
        )

      if (!responsePessoa.ok) {

        throw new Error(
          "Erro ao consultar dados do cliente"
        )
      }

      const pessoas =
        await responsePessoa.json()

      return pessoas.find(
        (item) =>
          item.id ===
          usuarioEncontrado.idCliente
      )
    }


    const responsePrestador =
      await fetch(
        "http://127.0.0.1:8089/Prestador"
      )

    if (!responsePrestador.ok) {

      throw new Error(
        "Erro ao consultar dados do prestador"
      )
    }

    const prestadores =
      await responsePrestador.json()

    return prestadores.find(
      (item) =>
        item.id ===
        usuarioEncontrado.idPrestador
    )
  }


  // =====================================================
  // LOGIN
  // =====================================================

  async function handleLogin(e) {

    e.preventDefault()


    // =====================================================
    // LOGIN DO ADMINISTRADOR
    // =====================================================

    if (tipo === "adm") {

      if (
        usuario === "admin" &&
        senha === "refores"
      ) {

        void navigate("../PesquisaGeral")

        return
      }

      alert("Usuário ou senha inválidos")

      return
    }


    try {

      // =====================================================
      // LOGIN COM BACKEND + BCrypt
      // =====================================================

      const responseLogin =
        await fetch(
          "http://127.0.0.1:8089/Usuarios/login",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              usuarioCriado: usuario,
              senhaCriada: senha
            })
          }
        )


      // =====================================================
      // LOGIN INVÁLIDO
      // =====================================================

      if (!responseLogin.ok) {

        const mensagem =
          await responseLogin.text()

        alert(
          mensagem ||
          "Usuário ou senha inválidos"
        )

        return
      }


      // =====================================================
      // USUÁRIO RETORNADO PELO BACKEND
      // =====================================================

      const usuarioEncontrado =
        await responseLogin.json()


      // =====================================================
      // VERIFICA O TIPO
      // =====================================================

      const tipoEsperado =
        tipo === "cliente"
          ? "cliente"
          : "prestador"


      if (
        usuarioEncontrado.tipoUsuario !==
        tipoEsperado
      ) {

        alert(
          "Usuário não pertence ao tipo selecionado"
        )

        return
      }


      // =====================================================
      // BUSCA OS DADOS DO CADASTRO
      // =====================================================

      const cadastroAtual =
        await buscarCadastro(
          usuarioEncontrado,
          tipo
        )


      // =====================================================
      // VERIFICA SE O CADASTRO FOI ENCONTRADO
      // =====================================================

      if (!cadastroAtual) {

        alert(
          "Usuário encontrado, mas cadastro não localizado."
        )

        return
      }


      // =====================================================
      // CRIA O USUÁRIO LOGADO
      // =====================================================

      const usuarioLogado = {

        usuarioId:
          usuarioEncontrado.id,

        id:
          tipo === "cliente"
            ? usuarioEncontrado.idCliente
            : usuarioEncontrado.idPrestador,

        tipoUsuario:
          usuarioEncontrado.tipoUsuario,

        nome:
          cadastroAtual.nome,

        email:
          cadastroAtual.email,

        telefone:
          cadastroAtual.telefone
      }


      // =====================================================
      // SALVA NO LOCAL STORAGE
      // =====================================================

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      )


      console.log(
        "Usuário logado:",
        usuarioLogado
      )


      // =====================================================
      // LOGIN REALIZADO
      // =====================================================

      alert(
        "Login realizado com sucesso!"
      )


      // =====================================================
      // DIRECIONAMENTO
      // =====================================================

      if (tipo === "cliente") {

        void navigate("/Logados")

      } else {

        void navigate("/Prestador")

      }


    } catch (error) {

      console.error(
        "Erro no login:",
        error
      )

      alert(
        "Erro ao realizar login"
      )
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

          <span className="logo-icon">
            🏗️
          </span>

          ReformaJá

        </div>


        {/* TABS */}

        <div className="tabs">

          <button
            type="button"
            className={`tab ${
              tipo === 'cliente'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setTipo('cliente')
            }
          >
            SOU CLIENTE
          </button>


          <button
            type="button"
            className={`tab ${
              tipo === 'pro'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setTipo('pro')
            }
          >
            SOU PROFISSIONAL
          </button>


          <button
            type="button"
            className={`tab ${
              tipo === 'adm'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setTipo('adm')
            }
          >
            SOU ADMINISTRADOR
          </button>

        </div>


        {/* FORM */}

        <div className="form-content">


          <div className="header-text">

            {tipo === 'cliente' ? (

              <>

                <h2>
                  Olá, Morador!
                </h2>

                <p>
                  Acompanhe a evolução da sua obra em tempo real.
                </p>

              </>

            ) : tipo === 'pro' ? (

              <>

                <h2>
                  Olá, Profissional!
                </h2>

                <p>
                  Encontre novas oportunidades de trabalho.
                </p>

              </>

            ) : (

              <>

                <h2>
                  Olá, Administrador!
                </h2>

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


          {tipo === 'cliente' && (

            <nav
              className="linkCadastro"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
                marginBottom: "2px",
                color: "green"
              }}
            >

              <Link
                to="/Cadastro/cliente"
                style={{
                  color: "blue",
                  textDecoration: "green",
                  fontSize: "15px"
                }}
              >
                CADASTRE-SE
              </Link>

            </nav>

          )}


          {tipo === 'pro' && (

            <nav
              className="linkCadastro"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
                marginBottom: "2px",
                color: "green"
              }}
            >

              <Link
                to="/cadastro/prestador/pro"
                style={{
                  color: "blue",
                  textDecoration: "green",
                  fontSize: "15px"
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

export default index