import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteHome.css';

function ClienteHome() {

  const navigate = useNavigate();

  const usuarioSalvo =
    localStorage.getItem('usuarioLogado');

  const usuario =
    usuarioSalvo
      ? JSON.parse(usuarioSalvo)
      : null;

  const [pedidos, setPedidos] = useState([]);
  const [carregandoPedidos, setCarregandoPedidos] = useState(true);

  const [nomesPrestadores, setNomesPrestadores] = useState({});

  useEffect(() => {

    const buscarPedidos = async () => {

      try {

        setCarregandoPedidos(true);

        const resposta = await fetch(
          'http://127.0.0.1:8089/Pedidos'
        );

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível carregar os pedidos.'
          );
        }

        const dados = await resposta.json();

        const idCliente =
          usuario.idCliente ?? usuario.id;

        const pedidosDoCliente = dados.filter(
          (pedido) =>
            Number(pedido.idCliente) === Number(idCliente)
        );

        setPedidos(pedidosDoCliente);

        // Buscar o nome dos prestadores
        const nomes = {};

        for (const pedido of pedidosDoCliente) {

          try {

            const respostaPrestador = await fetch(
              `http://127.0.0.1:8089/Prestador/${pedido.idPrestador}`
            );

            if (respostaPrestador.ok) {

              const prestador =
                await respostaPrestador.json();

              nomes[pedido.idPrestador] =
                prestador.nome;
            }

          } catch (error) {

            console.error(
              'Erro ao buscar prestador:',
              error
            );

          }
        }

        setNomesPrestadores(nomes);

      } catch (error) {

        console.error(
          'Erro ao buscar pedidos:',
          error
        );

      } finally {

        setCarregandoPedidos(false);

      }

    };

    buscarPedidos();

  }, []);

  if (!usuario || usuario.tipoUsuario !== 'cliente') {
    navigate('/login');
    return null;
  }

  const tiposServico = [
    { valor: 'Eletricista', icone: '⚡' },
    { valor: 'Encanador', icone: '🚰' },
    { valor: 'Gesseiro', icone: '🧱' },
    { valor: 'Marceneiro', icone: '🪚' },
    { valor: 'Marido de Aluguel', icone: '🔧' },
    { valor: 'Montador de Móveis', icone: '🪑' },
    { valor: 'Mudanças e Carretos', icone: '🚚' },
    { valor: 'Pedreiro', icone: '🧱' },
    { valor: 'Pintor', icone: '🎨' },
    { valor: 'Serralheiro', icone: '🔩' },
    { valor: 'Tapeceiro', icone: '🛋️' },
    { valor: 'Vidraceiro', icone: '🪟' }
  ];

  const selecionarServico = (servico) => {

    console.log('Cliente:', usuario);
    console.log('ID Cliente:', usuario.id);
    console.log('Serviço selecionado:', servico);

    navigate(
      `/prestadores/${encodeURIComponent(servico)}`
    );
  };

  const sair = () => {

    localStorage.removeItem('usuarioLogado');

    navigate('/login');
  };

  return (
    <main className="cliente-home">

      <header className="cliente-header">

        <div className="cliente-logo">
          Reforma Fácil
        </div>

        <div className="cliente-usuario">

          <span>
            Olá, <strong>{usuario.nome}</strong>
          </span>

          <button
            type="button"
            onClick={sair}
          >
            Sair
          </button>

        </div>

      </header>

      <section className="cliente-conteudo">

        <div className="cliente-titulo">

          <h1>
            Encontre o profissional que você precisa
          </h1>

          <p>
            Escolha uma categoria para encontrar prestadores de serviços.
          </p>

        </div>

        <div className="categorias-grid">

          {tiposServico.map((servico) => (

            <button
              key={servico.valor}
              type="button"
              className="categoria-card"
              onClick={() =>
                selecionarServico(servico.valor)
              }
            >

              <span className="categoria-icone">
                {servico.icone}
              </span>

              <span className="categoria-nome">
                {servico.valor}
              </span>

            </button>

          ))}

        </div>

        <section className="meus-pedidos">

          <div className="pedidos-header">

            <div>

              <h2>Meus pedidos</h2>

              <p>
                Acompanhe suas solicitações de serviço.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/meus-pedidos')
              }
              className="botao-pedidos"
            >
              Ver meus pedidos
            </button>

          </div>


          {/* CARREGANDO PEDIDOS */}

          {carregandoPedidos && (

            <div className="sem-pedidos">

              <div className="sem-pedidos-icone">
                📋
              </div>

              <h3>
                Carregando pedidos...
              </h3>

            </div>

          )}


          {/* NENHUM PEDIDO */}

          {!carregandoPedidos &&
            pedidos.length === 0 && (

              <div className="sem-pedidos">

                <div className="sem-pedidos-icone">
                  📋
                </div>

                <h3>
                  Você ainda não possui pedidos
                </h3>

                <p>
                  Escolha uma categoria acima para encontrar um profissional.
                </p>

              </div>

            )}


          {/* LISTA DE PEDIDOS */}

          {!carregandoPedidos &&
            pedidos.length > 0 && (

              <div className="lista-pedidos">

                {pedidos.map((pedido) => (

                  <div
                    key={pedido.id}
                    className="pedido-card"
                  >

                    <h3>
                      {pedido.servico}
                    </h3>

                    <p>
                      <strong>Pedido:</strong>{' '}
                      #{pedido.id}
                    </p>

                    <p>
                      <strong>Prestador:</strong>{' '}

                      {nomesPrestadores[pedido.idPrestador]
                        || 'Carregando...'}
                    </p>

                    <p>
                      <strong>Data desejada:</strong>{' '}
                      {pedido.dataDesejada}
                    </p>

                    <p>
                      <strong>Status:</strong>{' '}

                      <span className="pedido-status">
                        {pedido.status}
                      </span>

                    </p>

                  </div>

                ))}

              </div>

            )}

        </section>

      </section>

    </main>
  );
}

export default ClienteHome;