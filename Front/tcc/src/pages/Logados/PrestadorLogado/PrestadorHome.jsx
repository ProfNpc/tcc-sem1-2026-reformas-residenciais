import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrestadorHome.css';

function PrestadorHome() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarPedidos = async () => {
      try {
        const usuarioSalvo = localStorage.getItem('usuarioLogado');

        if (!usuarioSalvo) {
          navigate('/login');
          return;
        }

        const usuarioLogado = JSON.parse(usuarioSalvo);

        setUsuario(usuarioLogado);

        const idPrestador = usuarioLogado.id;

        if (!idPrestador) {
          setErro(
            'Não foi possível identificar o prestador logado.'
          );
          setCarregando(false);
          return;
        }

        const resposta = await fetch(
          'http://127.0.0.1:8089/Pedidos'
        );

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível carregar os pedidos.'
          );
        }

        const dados = await resposta.json();

        const pedidosDoPrestador = dados.filter(
          (pedido) =>
            Number(pedido.idPrestador) ===
            Number(idPrestador)
        );

        setPedidos(pedidosDoPrestador);

      } catch (error) {
        console.error(
          'Erro ao buscar pedidos:',
          error
        );

        setErro(
          'Não foi possível carregar os pedidos.'
        );

      } finally {
        setCarregando(false);
      }
    };

    buscarPedidos();
  }, [navigate]);

  const aceitarPedido = async (pedido) => {
    try {
      const pedidoAtualizado = {
        ...pedido,
        status: 'ACEITO'
      };

      const resposta = await fetch(
        `http://127.0.0.1:8089/Pedidos/${pedido.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedidoAtualizado)
        }
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível aceitar o pedido.'
        );
      }

      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((item) =>
          item.id === pedido.id
            ? {
                ...item,
                status: 'ACEITO'
              }
            : item
        )
      );

      alert('Pedido aceito com sucesso!');

    } catch (error) {
      console.error(
        'Erro ao aceitar pedido:',
        error
      );

      alert(
        'Não foi possível aceitar o pedido.'
      );
    }
  };

  const recusarPedido = async (pedido) => {
    try {
      const pedidoAtualizado = {
        ...pedido,
        status: 'RECUSADO'
      };

      const resposta = await fetch(
        `http://127.0.0.1:8089/Pedidos/${pedido.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedidoAtualizado)
        }
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível recusar o pedido.'
        );
      }

      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((item) =>
          item.id === pedido.id
            ? {
                ...item,
                status: 'RECUSADO'
              }
            : item
        )
      );

      alert('Pedido recusado.');

    } catch (error) {
      console.error(
        'Erro ao recusar pedido:',
        error
      );

      alert(
        'Não foi possível recusar o pedido.'
      );
    }
  };

  const sair = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  return (
    <main className="prestador-home">

      {/* CABEÇALHO */}
      <header className="prestador-topo">

        <div className="prestador-logo">
          Reforma Fácil
        </div>

        <div className="prestador-usuario">

          <span>
            Olá, <strong>{usuario?.nome || 'Prestador'}</strong>
          </span>

          <button
            type="button"
            onClick={sair}
          >
            Sair
          </button>

        </div>

      </header>


      {/* CONTEÚDO PRINCIPAL */}
      <section className="prestador-conteudo">

        {/* BOAS-VINDAS */}
        <div className="prestador-boas-vindas">

          <h1>
            Olá, {usuario?.nome || 'Prestador'}! 👋
          </h1>

          <p>
            Acompanhe e gerencie seus pedidos de serviço.
          </p>

        </div>


        {/* MEUS PEDIDOS */}
        <section className="meus-pedidos">

          <div className="meus-pedidos-cabecalho">

            <div>
              <h2>
                Meus pedidos
              </h2>

              <p>
                Confira as solicitações recebidas dos clientes.
              </p>
            </div>

          </div>


          {/* CARREGANDO */}
          {carregando && (
            <div className="prestador-mensagem">
              Carregando pedidos...
            </div>
          )}


          {/* ERRO */}
          {!carregando && erro && (
            <div className="prestador-mensagem erro">
              {erro}
            </div>
          )}


          {/* NENHUM PEDIDO */}
          {!carregando &&
            !erro &&
            pedidos.length === 0 && (

              <div className="prestador-mensagem">

                <h3>
                  Nenhum pedido encontrado
                </h3>

                <p>
                  Você ainda não possui pedidos de clientes.
                </p>

              </div>

            )}


          {/* LISTA DE PEDIDOS */}
          {!carregando &&
            !erro &&
            pedidos.length > 0 && (

              <div className="lista-pedidos-prestador">

                {pedidos.map((pedido) => (

                  <article
                    key={pedido.id}
                    className="pedido-prestador-card"
                  >

                    <div className="pedido-cabecalho">

                      <h3>
                        Pedido #{pedido.id}
                      </h3>

                      <span
                        className={`status-pedido status-${pedido.status?.toLowerCase()}`}
                      >
                        {pedido.status}
                      </span>

                    </div>


                    <div className="pedido-dados">

                      <p>
                        <strong>
                          Serviço:
                        </strong>{' '}
                        {pedido.servico}
                      </p>

                      <p>
                        <strong>
                          Descrição:
                        </strong>{' '}
                        {pedido.descricao}
                      </p>

                      <p>
                        <strong>
                          Endereço:
                        </strong>{' '}
                        {pedido.endereco}
                      </p>

                      <p>
                        <strong>
                          Data desejada:
                        </strong>{' '}
                        {pedido.dataDesejada}
                      </p>

                      {pedido.observacoes && (
                        <p>
                          <strong>
                            Observações:
                          </strong>{' '}
                          {pedido.observacoes}
                        </p>
                      )}

                    </div>


                    {/* AÇÕES */}
                    {pedido.status === 'PENDENTE' && (

                      <div className="acoes-pedido">

                        <button
                          type="button"
                          className="botao-aceitar"
                          onClick={() =>
                            aceitarPedido(pedido)
                          }
                        >
                          Aceitar pedido
                        </button>

                        <button
                          type="button"
                          className="botao-recusar"
                          onClick={() =>
                            recusarPedido(pedido)
                          }
                        >
                          Recusar pedido
                        </button>

                      </div>

                    )}

                  </article>

                ))}

              </div>

            )}

        </section>

      </section>

    </main>
  );
}

export default PrestadorHome;