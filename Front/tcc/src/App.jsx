import './style.css'

import { useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'

import Rotas from './Rotas'

{/*import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import PesquisaGeral from './pages/PesquisaGeral'
import PesquisaDeletados from './pages/PesquisaDeletados'
import Deletar from './pages/Deletar'
import Atualizar from './pages/Atualizar'
import Footer from './components/footer'*/}


/* ---------- NOVO: Grade de serviços (acrescentada, nada foi removido) ---------- */

const Icone = ({ children }) => (
  <svg
    className="servico-icone"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const SERVICOS = [
  {
    nome: 'Eletricista',
    slug: 'eletricista',
    descricao:
      'Instalação e troca de tomadas, interruptores, chuveiros, disjuntores e luminárias. Também resolvemos curto-circuito, quedas de energia e fiação antiga.',
    icone: (
      <Icone>
        <path d="M9 17a5 5 0 1 1 6 0v2H9v-2Z" />
        <path d="M10 21h4" />
        <path d="M12 7v4l-1.5 1.5" />
      </Icone>
    ),
  },
  {
    nome: 'Encanador',
    slug: 'encanador',
    descricao:
      'Conserto de vazamentos, desentupimento de pia, ralo e vaso, troca de torneiras e registros, instalação de máquina de lavar e limpeza de caixa d\u2019água.',
    icone: (
      <Icone>
        <path d="M4 5h5v6H4z" />
        <path d="M9 8h5a4 4 0 0 1 4 4v3" />
        <path d="M15 15h6v4h-6z" />
        <path d="M7 14v1.5" />
      </Icone>
    ),
  },
  {
    nome: 'Gesseiro',
    slug: 'gesseiro',
    descricao:
      'Forro de gesso, sanca com iluminação, molduras e paredes de drywall. Fazemos instalação, reparo de trincas e acabamento pronto para pintura.',
    icone: (
      <Icone>
        <path d="M3 6h18v12H3z" />
        <path d="M3 10h18M3 14h18M9 6v4M15 6v4M6 10v4M12 10v4M18 10v4M9 14v4M15 14v4" />
      </Icone>
    ),
  },
  {
    nome: 'Marceneiro',
    slug: 'marceneiro',
    descricao:
      'Móveis sob medida, armários, prateleiras e portas. Também ajustamos gavetas, dobradiças e recuperamos peças de madeira danificadas.',
    icone: (
      <Icone>
        <path d="M5 4v10a3 3 0 0 0 6 0V4" />
        <path d="M5 7h6" />
        <path d="M15 20V6l4-2v16" />
      </Icone>
    ),
  },
  {
    nome: 'Marido de Aluguel',
    slug: 'marido-de-aluguel',
    descricao:
      'Pequenos reparos do dia a dia: furar parede, fixar quadros e prateleiras, trocar fechaduras, resolver goteiras e ajustar portas que estão emperrando.',
    icone: (
      <Icone>
        <path d="M4 5.5 15 17l2.5-2.5L6 3H4v2.5Z" />
        <path d="M19 4.5a3.5 3.5 0 0 0-4.6 4.6L5 18.5 7.5 21l9.4-9.4A3.5 3.5 0 0 0 21 7l-2 2-2-2 2-2.5Z" />
      </Icone>
    ),
  },
  {
    nome: 'Montador de Móveis',
    slug: 'montador-de-moveis',
    descricao:
      'Montagem e desmontagem de guarda-roupas, camas, estantes, mesas e móveis planejados. Ideal para quem acabou de comprar ou vai mudar de casa.',
    icone: (
      <Icone>
        <path d="M4 4h16v16H4z" />
        <path d="M4 10h16M12 4v16" />
        <path d="M8 7.2h1.5M15 7.2h1.5M8 13.5h1.5M15 13.5h1.5" />
      </Icone>
    ),
  },
  {
    nome: 'Mudanças e Carretos',
    slug: 'mudancas-e-carretos',
    descricao:
      'Transporte de móveis, eletrodomésticos e caixas dentro da cidade ou entre cidades. Inclui carregamento, embalagem e içamento quando necessário.',
    icone: (
      <Icone>
        <path d="M2 7h11v9H2z" />
        <path d="M13 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </Icone>
    ),
  },
  {
    nome: 'Pedreiro',
    slug: 'pedreiro',
    descricao:
      'Alvenaria, reboco, contrapiso, assentamento de piso e azulejo, construção de muros e pequenas reformas estruturais.',
    icone: (
      <Icone>
        <path d="M3 5h12v5H3zM3 14h12v5H3z" />
        <path d="M9 5v5M6 14v5M12 14v5" />
        <path d="m15 12 6-5v4l-4 4-2-3Z" />
      </Icone>
    ),
  },
  {
    nome: 'Pintor',
    slug: 'pintor',
    descricao:
      'Pintura interna e externa, massa corrida, textura e grafiato. O preparo da parede e a proteção dos móveis fazem parte do serviço.',
    icone: (
      <Icone>
        <path d="M4 4h13v5H4z" />
        <path d="M17 6.5h3v4h-8v3" />
        <path d="M10 13.5h4V21h-4z" />
      </Icone>
    ),
  },
  {
    nome: 'Serralheiro',
    slug: 'serralheiro',
    descricao:
      'Portões, grades, corrimãos, escadas e estruturas metálicas. Fazemos fabricação sob medida, solda, troca de motor e reparo de peças enferrujadas.',
    icone: (
      <Icone>
        <path d="M4 21V8a4 4 0 0 1 8 0v8a3 3 0 0 0 6 0V6" />
        <path d="M16 6h4l-2-3-2 3Z" />
      </Icone>
    ),
  },
  {
    nome: 'Tapeceiro',
    slug: 'tapeceiro',
    descricao:
      'Reforma de estofados em geral: troca de tecido, espuma e percinta em sofás, poltronas, cadeiras e cabeceiras.',
    icone: (
      <Icone>
        <path d="M4 11V8a2 2 0 0 1 4 0v3h8V8a2 2 0 0 1 4 0v3" />
        <path d="M3 11h18v6H3z" />
        <path d="M6 17v2M18 17v2" />
      </Icone>
    ),
  },
  {
    nome: 'Vidraceiro',
    slug: 'vidraceiro',
    descricao:
      'Instalação e troca de vidros, box de banheiro, espelhos, janelas e portas de vidro temperado, com medição no local.',
    icone: (
      <Icone>
        <path d="M4 4h16v16H4z" />
        <path d="M12 4v16M4 12h16" />
      </Icone>
    ),
  },
]

function ServicosGrid({ onSolicitar }) {
  const [slugAberto, setSlugAberto] = useState(null)
  const selecionado = SERVICOS.find((s) => s.slug === slugAberto)

  return (
    <section className="servicos" id="servicos">
      <h2 className="servicos-titulo">Solicite um orçamento grátis</h2>
      <p className="servicos-subtitulo">
        Explique pra gente o que você precisa e encontraremos os melhores
        profissionais da sua região
      </p>

      <ul className="servicos-grid">
        {SERVICOS.map((servico) => {
          const aberto = servico.slug === slugAberto
          return (
            <li key={servico.slug}>
              <button
                type="button"
                className={`servico-card${aberto ? ' is-aberto' : ''}`}
                aria-expanded={aberto}
                aria-controls="servico-detalhe"
                onClick={() => setSlugAberto(aberto ? null : servico.slug)}
              >
                {servico.icone}
                <span className="servico-nome">{servico.nome}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {selecionado && (
        <div className="servico-detalhe" id="servico-detalhe">
          <div className="servico-detalhe-topo">
            <h3>{selecionado.nome}</h3>
            <button
              type="button"
              className="servico-fechar"
              aria-label="Fechar descrição"
              onClick={() => setSlugAberto(null)}
            >
              ×
            </button>
          </div>

          <p>{selecionado.descricao}</p>

          <button
            type="button"
            className="servico-cta"
            onClick={() => onSolicitar?.(selecionado.slug)}
          >
            Solicitar orçamento
          </button>
        </div>
      )}
    </section>
  )
}

/* ------------------------------- Home ------------------------------- */

function Home() {
  const navigate = useNavigate()
  return (
            <>
                <header>
                  <div className="logo">🏗️ ReformaJá</div>
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

                {/* NOVO: grade de serviços agora logo após o hero */}
                <ServicosGrid onSolicitar={() => navigate('/login')} />

                {/* "Qualificações" desceu para junto de Dicas de contratação e Avaliações */}
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
      <Rotas Home={Home} />
    </BrowserRouter>
  )
}