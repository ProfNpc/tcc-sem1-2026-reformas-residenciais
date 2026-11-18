
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API = 'http://127.0.0.1:8089';

export default function DashboardAdmin() {
  const navigate = useNavigate();

  const [dados, setDados] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(
      localStorage.getItem('usuarioLogado') || 'null'
    );

    const tipo = String(usuario?.tipoUsuario || '').toLowerCase();

    if (!usuario || !['adm', 'administrador'].includes(tipo)) {
      navigate('/login', { replace: true });
      return;
    }

    carregarDashboard();
  }, [navigate]);

  async function carregarDashboard() {
    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch(`${API}/Dashboard/admin`);

      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os dados do dashboard.');
      }

      const resultado = await resposta.json();
      setDados(resultado || {});
    } catch (error) {
      setErro(error.message || 'Erro ao carregar dashboard.');
    } finally {
      setCarregando(false);
    }
  }

  function sair() {
    const confirmar = window.confirm(
      'Deseja realmente sair do sistema?'
    );

    if (confirmar) {
      localStorage.removeItem('usuarioLogado');
      navigate('/login', { replace: true });
    }
  }

  function acessarAdministradores() {
    navigate('/admin/administradores');
  }

  function acessarCadastros() {
    navigate('/PesquisaGeral');
  }

  const totalClientes =
    dados.totalClientes ?? dados.quantidadeClientes ?? 0;

  const totalPrestadores =
    dados.totalPrestadores ?? dados.quantidadePrestadores ?? 0;

  const totalPedidos =
    dados.totalPedidos ?? dados.quantidadePedidos ?? 0;

  const pedidosPendentes =
    dados.pedidosPendentes ?? dados.totalPendentes ?? 0;

  const prestadorMaisSolicitado =
    dados.prestadorMaisSolicitado ?? 'Não disponível';

  const servicoMaisSolicitado =
    dados.servicoMaisSolicitado ?? 'Não disponível';

  const pedidosPorServico =
    dados.pedidosPorServico ??
    dados.servicosMaisSolicitados ??
    [];

  const pedidosPorStatus =
    dados.pedidosPorStatus ??
    dados.quantidadePorStatus ??
    [];

  function obterValor(item) {
    return (
      item.quantidade ??
      item.total ??
      item.valor ??
      item.quantidadePedidos ??
      0
    );
  }

  function obterNome(item) {
    return (
      item.servico ??
      item.nomeServico ??
      item.status ??
      item.nome ??
      'Não informado'
    );
  }

  const maiorQuantidadeServico = Math.max(
    1,
    ...pedidosPorServico.map(obterValor)
  );

  const maiorQuantidadeStatus = Math.max(
    1,
    ...pedidosPorStatus.map(obterValor)
  );

  return (
    <main className="dashboard-page">

      <header className="dash-header">
        <div>
          <span className="dash-eyebrow">REFORMA FÁCIL</span>
          <h1>Dashboard Administrativo</h1>
          <p>Bem-vindo ao painel de administração.</p>
        </div>

        <div className="dash-actions">

          <button
            type="button"
            className="dash-button secondary"
            onClick={carregarDashboard}
            disabled={carregando}
          >
            Atualizar
          </button>

          <button
            type="button"
            className="dash-button"
            onClick={acessarCadastros}
          >
            Cadastros
          </button>

          <button
            type="button"
            className="dash-button"
            onClick={acessarAdministradores}
          >
            Administradores
          </button>

          <button
            type="button"
            className="dash-button danger"
            onClick={sair}
          >
            Sair
          </button>

        </div>
      </header>

      {erro && (
        <div className="dash-error">
          {erro}
        </div>
      )}

      {carregando ? (
        <p className="dash-empty">
          Carregando informações...
        </p>
      ) : (
        <>

          {/* INDICADORES PRINCIPAIS */}

          <section className="dash-cards">

            <article className="dash-card">
              <span className="dash-card-title">
                Total de Clientes
              </span>
              <strong className="dash-card-value">
                {totalClientes}
              </strong>
            </article>

            <article className="dash-card">
              <span className="dash-card-title">
                Total de Prestadores
              </span>
              <strong className="dash-card-value">
                {totalPrestadores}
              </strong>
            </article>

            <article className="dash-card">
              <span className="dash-card-title">
                Total de Pedidos
              </span>
              <strong className="dash-card-value">
                {totalPedidos}
              </strong>
            </article>

            <article className="dash-card">
              <span className="dash-card-title">
                Pedidos Pendentes
              </span>
              <strong className="dash-card-value">
                {pedidosPendentes}
              </strong>
            </article>

          </section>

          {/* DESTAQUES */}

          <section className="dash-cards">

            <article className="dash-card">
              <span className="dash-card-title">
                Prestador mais solicitado
              </span>
              <strong className="dash-card-value">
                {prestadorMaisSolicitado}
              </strong>
            </article>

            <article className="dash-card">
              <span className="dash-card-title">
                Serviço mais solicitado
              </span>
              <strong className="dash-card-value">
                {servicoMaisSolicitado}
              </strong>
            </article>

          </section>

          {/* GRÁFICOS */}

          <section className="dash-grid">

            {/* PEDIDOS POR SERVIÇO */}

            <article className="dash-panel">
              <h2>Pedidos por Serviço</h2>

              {Array.isArray(pedidosPorServico) &&
              pedidosPorServico.length > 0 ? (

                <div className="dash-bars">

                  {pedidosPorServico.map((item, index) => {
                    const quantidade = obterValor(item);

                    const percentual =
                      (quantidade / maiorQuantidadeServico) * 100;

                    return (
                      <div
                        className="dash-bar-item"
                        key={index}
                      >

                        <div className="dash-bar-heading">
                          <span>{obterNome(item)}</span>
                          <strong>{quantidade}</strong>
                        </div>

                        <div className="dash-bar-track">
                          <div
                            className="dash-bar-fill"
                            style={{ width: `${percentual}%` }}
                          />
                        </div>

                      </div>
                    );
                  })}

                </div>

              ) : (
                <p className="dash-empty">
                  Nenhum dado de serviço disponível.
                </p>
              )}

            </article>

            {/* PEDIDOS POR STATUS */}

            <article className="dash-panel">
              <h2>Pedidos por Status</h2>

              {Array.isArray(pedidosPorStatus) &&
              pedidosPorStatus.length > 0 ? (

                <div className="dash-bars">

                  {pedidosPorStatus.map((item, index) => {
                    const quantidade = obterValor(item);

                    const percentual =
                      (quantidade / maiorQuantidadeStatus) * 100;

                    return (
                      <div
                        className="dash-bar-item"
                        key={index}
                      >

                        <div className="dash-bar-heading">
                          <span>{obterNome(item)}</span>
                          <strong>{quantidade}</strong>
                        </div>

                        <div className="dash-bar-track">
                          <div
                            className="dash-bar-fill"
                            style={{ width: `${percentual}%` }}
                          />
                        </div>

                      </div>
                    );
                  })}

                </div>

              ) : (
                <p className="dash-empty">
                  Nenhum dado de status disponível.
                </p>
              )}

            </article>

          </section>

        </>
      )}

    </main>
  );
}
