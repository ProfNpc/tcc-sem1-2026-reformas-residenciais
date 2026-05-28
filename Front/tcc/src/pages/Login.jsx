import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../stylelogin.css'

/*import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'*/
import PesID from './PesID'


function Login() {


  const [tipo, setTipo] = useState('cliente')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  function handleLogin(e) {
    e.preventDefault()

    console.log({
      tipo,
      usuario,
      senha,
    })

    // Aqui depois você liga na API Spring
  }

  return (
    <div
    

    id="body-context"
    className={`login-page ${tipo === 'cliente' ? 'theme-cliente' : 'theme-pro'}`}
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
            className={`tab ${tipo === 'cliente' ? 'active' : ''}`}
            onClick={() => setTipo('cliente')}
          >
            SOU CLIENTE
          </div>

          <div
            className={`tab ${tipo === 'pro' ? 'active' : ''}`}
            onClick={() => setTipo('pro')}
          >
            SOU PROFISSIONAL
          </div>

        </div>

        {/* FORM */}
        <div className="form-content">

          <div className="header-text">

            {tipo === 'cliente' ? (
              <>
                <h2>Olá, Morador!</h2>
                <p>Acompanhe a evolução da sua obra em tempo real.</p>
              </>
            ) : (
              <>
                <h2>Olá, Profissional!</h2>
                <p>Encontre novas oportunidades de trabalho.</p>
              </>
            )}

          </div>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>E-MAIL OU CPF</label>

              <input
                type="text"
                placeholder="Digite seus dados"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>SENHA</label>

              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">
              {tipo === 'cliente'
                ? 'ACESSAR MINHA OBRA'
                : 'ACESSAR PAINEL'}
            </button>

          </form>

          {/* FOOTER */}
          <div className="footer">

            <span>
              Quer reformar?{' '}
              <Link to="/Cadastro">
                Peça seu orçamento
              </Link>
            </span>

            <br />
            <br />

            <span>
              Quer reformar?{' '}
              <Link to="/PesID">
                Verificar seu cadastro
              </Link>
            </span>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Login