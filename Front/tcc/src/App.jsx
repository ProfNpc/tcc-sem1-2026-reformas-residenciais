{/*


import './style.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/login'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <div className="logo">🏗️ ReformaJá</div>

        <nav className="nav-links">
          <a onClick={() => navigate('/login')}>
            Sou cliente
          </a>

          <a
            className="btn-main-sol"
            onClick={() => navigate('/login')}
          >
            Solicitar orçamento
          </a>

          <a
            className="btn-main"
            onClick={() => navigate('/login')}
          >
            Sou Profissional
          </a>
        </nav>
      </header>

      <section className="hero">
        <h1>
          Transforme sua casa com profissionais de confiança
        </h1>

        <p>
          A plataforma que conecta sua obra aos melhores especialistas da sua região.
        </p>

        <button
          className="btn-sol-orcamento"
          style={{ background: 'var(--accent)' }}
          onClick={() => navigate('/login')}
        >
          Solicitar orçamento
        </button>

        <div className="scroll-indicator">↓</div>
      </section>

      {/* resto do seu layout continua igual 
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
*/}



import './style.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'




import Cadastro from './pages/cadastro'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <div class="logo">🏗️ ReformaJá</div>
        <nav className="nav-links">       
         

          <a onClick={() => navigate('/login')} className="btn-main-cliente" style={{ cursor: 'pointer' }}> Sou cliente</a>
      
          <a onClick={() => navigate('/login')} className="btn-main" style={{ cursor: 'pointer' }}>Sou Profissional</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Transforme sua casa com profissionais de confiança</h1>
        <p>A plataforma que conecta sua obra aos melhores especialistas da sua região.</p>
        <br />
        <button 
          type="button" 
          id="btn-sol-orcamento1" 
          className="btn-sol-orcamento" 
          style={{ background: 'var(--accent)' }}
          onClick={() => navigate('/login')}
        > 
          Solicitar orçamento 
        </button>
        <div className="scroll-indicator">↓</div>
      </section>

      <div className="container" id="modelo">
        <h2 style={{ textAlign: 'center' }}>Qualificações | Serviços Disponiveis</h2>

        <div className="grid">
          <div className="card">
            <h3>Nicho de Especialista</h3>
            <p>Contamos com profissionais treinados e altamente qualificados.</p>
            <p>Nossa equipe é credenciada junto aos órgãos federais competentes.</p>
          </div>

          <div className="card">
            <h3>Nicho de Serviços <span className="badge">Profissionais</span></h3>
            <ul>
              <li><strong>Soluções em pintura, elétrica, montagem e hidráulica, com profissionais altamente qualificados.</strong></li>
              <li><strong>Excelência em alvenaria, gesso, jardinagem e azulejaria, com acabamento profissional e qualidade.</strong></li>
            </ul>
          </div>
        </div>
      </div> 


      

      
      {/* Mantido exatamente como no seu HTML original */}

      
      <div className="container" id="tecnologia" style={{ background: '#edf2f7' }}>
        <h2 style={{ textAlign: 'center' }}>Dicas de contratação & Dicas de Segurança</h2>

        <div className="grid">
          <div className="card">
            <h3>O que fazer se o chuveiro não esquentar</h3>
            <p><strong>Chuveiro não esquenta pode ti dar muita dor de cabeça: </strong> Mas nossos especialista tem a solucção para, contrate ja.</p>
          </div>

          <div className="card" id="seguranca">
            <h3>Dicas de segurança</h3>
            <p><strong>Como garantir a segurança na hora da contratação? </strong> Proteja seus dados no dia a dia e manter sua segurança para evitar cair em golpes.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 style={{ textAlign: 'center' }}>Avaliações</h2>
        <div className="grid">
          <div className="card">
            <h3>Profissional Avaliado</h3>
            <p><em>"otimo profissional, recomendo"</em></p>
          </div>

          <div className="card">
            <h3>Cliente Avaliado</h3>
            <p>otimo cliente</p>
          </div>
        </div>
      </div> 

      <footer>
        <p>&copy; 2024 ReformaJá - Conectando quem constrói com quem precisa.</p>
      </footer> 
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      

        <Route
      path="/cadastro"
      element={<Cadastro />}
    />

  </Routes>

    </BrowserRouter>
  )
}



/*
import './style.css'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import Login from './pages/Loginogin'
import Cadastro from './pages/cadastro'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <div className="logo">🏗️ ReformaJá</div>

        <nav className="nav-links">

          <a
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer' }}
          >
            Sou cliente
          </a>

          <a
            onClick={() => navigate('/login')}
            className="btn-main-sol"
            style={{ cursor: 'pointer' }}
          >
            Solicitar orcamento
          </a>

          <a
            onClick={() => navigate('/login')}
            className="btn-main"
            style={{ cursor: 'pointer' }}
          >
            Sou Profissional
          </a>

        </nav>
      </header>

      <section className="hero">
        <h1>
          Transforme sua casa com profissionais de confiança
        </h1>

        <p>
          A plataforma que conecta sua obra aos melhores especialistas da sua região.
        </p>

        <br />

        <button
          type="button"
          id="btn-sol-orcamento1"
          className="btn-sol-orcamento"
          style={{ background: 'var(--accent)' }}
          onClick={() => navigate('/login')}
        >
          Solicitar orçamento
        </button>

        <div className="scroll-indicator">↓</div>
      </section>

      <footer>
        <p>
          &copy; 2024 ReformaJá
        </p>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

      </Routes>

    </BrowserRouter>
  )
}
  */