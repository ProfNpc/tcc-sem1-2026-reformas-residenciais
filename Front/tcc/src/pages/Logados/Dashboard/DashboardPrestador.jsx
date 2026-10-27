import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API = 'http://127.0.0.1:8089';

function Cartao({ titulo, valor }) {
  return (
    <div className="dash-card">
      <span className="dash-card-title">{titulo}</span>
      <strong className="dash-card-value">{valor ?? 0}</strong>
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

export default function DashboardPrestador() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(
      localStorage.getItem('usuarioLogado') || 'null'
    );

    if (
      !usuario ||
      String(usuario.tipoUsuario).toLowerCase() !== 'prestador' ||
      !usuario.id
    ) {
      navigate('/login', { replace: true });
      return;
    }

    let ativo = true;

    async function carregarDashboard() {
      try {
        const response = await fetch(
          `${API}/Dashboard/prestador/${usuario.id}`
        );

        if (!response.ok) {
          throw new Error('Não foi possível carregar os indicadores do prestador.');
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
          <h1>Meu dashboard</h1>
          <p>Olá, {dados.nomePrestador || 'prestador'}! Veja o resumo dos seus pedidos.</p>
        </div>

        <div className="dash-actions">
          <button
            className="dash-button secondary"
            onClick={() => window.location.reload()}
          >
            Atualizar
          </button>
          <button className="dash-button" onClick={() => navigate('/prestador')}>
            Meus pedidos
          </button>
          <button className="dash-button danger" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      {erro && <p className="dash-warning">{erro}</p>}

      <section className="dash-cards">
        <Cartao titulo="Total de pedidos recebidos" valor={dados.totalPedidos} />
        <Cartao
          titulo="Pedidos pendentes"
          valor={dados.pedidosPorStatus?.find(
            item => item.label === 'PENDENTE'
          )?.total || 0}
        />
        <Cartao
          titulo="Pedidos aceitos"
          valor={dados.pedidosPorStatus?.find(
            item => item.label === 'ACEITO'
          )?.total || 0}
        />
        <Cartao
          titulo="Pedidos encerrados"
          valor={dados.pedidosPorStatus?.find(
            item => item.label === 'ENCERRADO'
          )?.total || 0}
        />
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
      </section>
    </main>
  );
}