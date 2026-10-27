import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API = 'http://127.0.0.1:8089';

function Cartao({ titulo, valor }) {
  return (
    <div className="dash-card">
      <span className="dash-card-title">{titulo}</span>
      <strong className="dash-card-value">
        {valor ?? 0}
      </strong>
    </div>
  );
}

function GraficoBarras({ titulo, dados = [] }) {
  const maior = Math.max(
    1,
    ...dados.map(item => Number(item.total) || 0)
  );

  return (
    <section className="dash-panel">
      <h2>{titulo}</h2>

      {dados.length === 0 ? (
        <p className="dash-empty">Ainda não existem dados para exibir.</p>
      ) : (
        <div className="dash-bars">
          {dados.map((item, index) => (
            <div className="dash-bar-item" key={`${item.label}-${index}`}>
              <div className="dash-bar-heading">
                <span>{item.label}</span>
                <strong>{item.total}</strong>
              </div>

              <div className="dash-bar-track">
                <div
                  className="dash-bar-fill"
                  style={{
                    width: `${(Number(item.total) / maior) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function TabelaRanking({ dados = [] }) {
  return (
    <section className="dash-panel">
      <h2>Prestadores mais solicitados</h2>

      {dados.length === 0 ? (
        <p className="dash-empty">Ainda não existem pedidos atribuídos a prestadores.</p>
      ) : (
        <div className="dash-table-wrapper">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Prestador</th>
                <th>Pedidos</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={item.idPrestador}>
                  <td>{index + 1}º</td>
                  <td>{item.nome}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(
      localStorage.getItem('usuarioLogado') || 'null'
    );

    if (!usuario || !['adm', 'administrador'].includes(
      String(usuario.tipoUsuario).toLowerCase()
    )) {
      navigate('/login', { replace: true });
      return;
    }

    let ativo = true;

    async function carregarDashboard() {
      try {
        const response = await fetch(`${API}/Dashboard/admin`);

        if (!response.ok) {
          throw new Error('Não foi possível carregar os indicadores.');
        }

        const resultado = await response.json();

        if (ativo) {
          setDados(resultado);
          setErro('');
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Erro ao carregar o dashboard.');
        }
      }
    }

    carregarDashboard();

    return () => {
      ativo = false;
    };
  }, [navigate]);

  function sair() {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  }

  if (erro && !dados) {
    return (
      <main className="dashboard-page">
        <p className="dash-error">{erro}</p>
        <button className="dash-button" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </main>
    );
  }

  if (!dados) {
    return <main className="dashboard-page">Carregando dashboard...</main>;
  }

  return (
    <main className="dashboard-page">
      <header className="dash-header">
        <div>
          <p className="dash-eyebrow">REFORMA FÁCIL</p>
          <h1>Dashboard administrativo</h1>
          <p>Visão geral dos cadastros e pedidos da plataforma.</p>
        </div>

        <div className="dash-actions">
          <button className="dash-button secondary" onClick={() => window.location.reload()}>
            Atualizar
          </button>
          <button className="dash-button" onClick={() => navigate('/PesquisaGeral')}>
            Cadastros
          </button>
          <button className="dash-button danger" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      {erro && <p className="dash-warning">{erro}</p>}

      <section className="dash-cards">
        <Cartao titulo="Clientes ativos" valor={dados.totalClientes} />
        <Cartao titulo="Prestadores ativos" valor={dados.totalPrestadores} />
        <Cartao titulo="Total de pedidos" valor={dados.totalPedidos} />
      </section>

      <section className="dash-grid">
        <GraficoBarras
          titulo="Serviços mais solicitados"
          dados={dados.servicosMaisSolicitados}
        />

        <GraficoBarras
          titulo="Pedidos por status"
          dados={dados.pedidosPorStatus}
        />

        <GraficoBarras
          titulo="Pedidos por mês desejado"
          dados={dados.pedidosPorMes}
        />

        <TabelaRanking dados={dados.rankingPrestadores} />
      </section>
    </main>
  );
}