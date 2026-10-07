import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrestadorHome.css';

function PrestadorHome() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [pedidoWhatsApp, setPedidoWhatsApp] = useState(null);
  const [whatsappPrestador, setWhatsappPrestador] = useState('');

  const [pedidoRecusa, setPedidoRecusa] = useState(null);
  const [motivoRecusa, setMotivoRecusa] = useState('');

  // Encerramento do pedido
  const [pedidoEncerramento, setPedidoEncerramento] = useState(null);
  const [observacaoEncerramento, setObservacaoEncerramento] = useState('');

  // Menu dos três tracinhos
  const [menuAberto, setMenuAberto] = useState(false);

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
          setErro('Não foi possível identificar o prestador logado.');
          setCarregando(false);
          return;
        }

        const resposta = await fetch(
          'http://127.0.0.1:8089/Pedidos'
        );

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os pedidos.');
        }

        const dados = await resposta.json();

        const pedidosDoPrestador = dados.filter(
          (pedido) =>
            Number(pedido.idPrestador) === Number(idPrestador)
        );

        setPedidos(pedidosDoPrestador);

      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setErro('Não foi possível carregar os pedidos.');
      } finally {
        setCarregando(false);
      }
    };

    buscarPedidos();
  }, [navigate]);

  const aceitarPedido = (pedido) => {
    setPedidoWhatsApp(pedido);
    setWhatsappPrestador('');
  };

  const confirmarAceite = async () => {
    if (!whatsappPrestador.trim()) {
      alert('Informe o WhatsApp para aceitar o pedido.');
      return;
    }

    try {
      const resposta = await fetch(
        `http://127.0.0.1:8089/Pedidos/${pedidoWhatsApp.id}/aceitar`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            whatsappPrestador: whatsappPrestador
          })
        }
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível aceitar o pedido.');
      }

      const pedidoAtualizado = await resposta.json();

      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((item) =>
          item.id === pedidoWhatsApp.id
            ? pedidoAtualizado
            : item
        )
      );

      setPedidoWhatsApp(null);
      setWhatsappPrestador('');

      alert('Pedido aceito com sucesso!');

    } catch (error) {
      console.error('Erro ao aceitar pedido:', error);
      alert('Não foi possível aceitar o pedido.');
    }
  };

  const recusarPedido = (pedido) => {
    setPedidoRecusa(pedido);
    setMotivoRecusa('');
  };

  const confirmarRecusa = async () => {
    if (!motivoRecusa.trim()) {
      alert('Informe o motivo da recusa.');
      return;
    }

    try {
      const pedidoAtualizado = {
        ...pedidoRecusa,
        status: 'RECUSADO',
        observacoes: motivoRecusa
      };

      const resposta = await fetch(
        `http://127.0.0.1:8089/Pedidos/${pedidoRecusa.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedidoAtualizado)
        }
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível recusar o pedido.');
      }

      const pedidoRetornado = await resposta.json();

      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((item) =>
          item.id === pedidoRecusa.id
            ? pedidoRetornado
            : item
        )
      );

      setPedidoRecusa(null);
      setMotivoRecusa('');

      alert('Pedido recusado com sucesso.');

    } catch (error) {
      console.error('Erro ao recusar pedido:', error);
      alert('Não foi possível recusar o pedido.');
    }
  };

  // Abrir WhatsApp do cliente
  const abrirWhatsAppCliente = (pedido) => {
    if (!pedido.whatsappCliente) {
      alert('O WhatsApp do cliente não foi informado.');
      return;
    }

    const numero = pedido.whatsappCliente.replace(/\D/g, '');

    if (!numero) {
      alert('WhatsApp do cliente inválido.');
      return;
    }

    const mensagem = encodeURIComponent(
      `Olá! Sou o prestador responsável pelo seu pedido #${pedido.id}. Código de atendimento: ${pedido.codigoAtendimento || ''}`
    );

    window.open(
      `https://wa.me/${numero}?text=${mensagem}`,
      '_blank'
    );
  };

  // Abrir modal para encerrar pedido
  const encerrarPedido = (pedido) => {
    setPedidoEncerramento(pedido);
    setObservacaoEncerramento('');
  };

  // Confirmar encerramento
  const confirmarEncerramento = async () => {
    if (!observacaoEncerramento.trim()) {
      alert('Informe uma observação para encerrar o pedido.');
      return;
    }

    try {
      const resposta = await fetch(
        `http://127.0.0.1:8089/Pedidos/${pedidoEncerramento.id}/encerrar`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            observacoes: observacaoEncerramento
          })
        }
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível encerrar o pedido.');
      }

      const pedidoRetornado = await resposta.json();

      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((item) =>
          item.id === pedidoEncerramento.id
            ? pedidoRetornado
            : item
        )
      );

      setPedidoEncerramento(null);
      setObservacaoEncerramento('');

      alert('Pedido encerrado com sucesso!');

    } catch (error) {
      console.error('Erro ao encerrar pedido:', error);
      alert('Não foi possível encerrar o pedido.');
    }
  };

  const sair = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  return (
    <main className="prestador-home">

      <header className="prestador-topo">

        <div className="prestador-logo">
          Reforma Fácil
        </div>

        <div className="prestador-usuario">

          <span>
            Olá, <strong>{usuario?.nome || 'Prestador'}</strong>
          </span>

          <div className="menu-usuario">

            <button
              type="button"
              className="botao-menu"
              onClick={() =>
                setMenuAberto(!menuAberto)
              }
              aria-label="Abrir menu"
            >
              ☰
            </button>

            {menuAberto && (

              <div className="menu-dropdown">

                <button
                  type="button"
                  onClick={() => {
                    setMenuAberto(false);
                    navigate('/editar-prestador');
                  }}
                >
                  ✏️ Editar meus dados
                </button>

              </div>

            )}

          </div>

          <button
            type="button"
            className="botao-sair"
            onClick={sair}
          >
            Sair
          </button>

        </div>

      </header>

      <section className="prestador-conteudo">

        <div className="prestador-boas-vindas">

          <h1>
            Olá, {usuario?.nome || 'Prestador'}! 👋
          </h1>

          <p>
            Acompanhe e gerencie seus pedidos de serviço.
          </p>

        </div>

        <section className="meus-pedidos">

          <div className="meus-pedidos-cabecalho">

            <div>

              <h2>Meus pedidos</h2>

              <p>
                Confira as solicitações recebidas dos clientes.
              </p>

            </div>

          </div>

          {carregando && (
            <div className="prestador-mensagem">
              Carregando pedidos...
            </div>
          )}

          {!carregando && erro && (
            <div className="prestador-mensagem erro">
              {erro}
            </div>
          )}

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
                        <strong>Serviço:</strong>{' '}
                        {pedido.servico}
                      </p>

                      <p>
                        <strong>Descrição:</strong>{' '}
                        {pedido.descricao}
                      </p>

                      <p>
                        <strong>Endereço:</strong>{' '}
                        {pedido.endereco}
                      </p>

                      <p>
                        <strong>Data desejada:</strong>{' '}
                        {pedido.dataDesejada}
                      </p>

                      {pedido.observacoes && (
                        <p>
                          <strong>Observações:</strong>{' '}
                          {pedido.observacoes}
                        </p>
                      )}

                    </div>

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

                    {pedido.status === 'ACEITO' && (

                      <div className="pedido-aceito">

                        <p>
                          <strong>
                            Código de atendimento:
                          </strong>{' '}
                          {pedido.codigoAtendimento ||
                            pedido.codigo_atendimento ||
                            'Código não encontrado'}
                        </p>

                        <p>
                          <strong>
                            WhatsApp do cliente:
                          </strong>{' '}
                          {pedido.whatsappCliente ||
                            'Não informado'}
                        </p>

                        <div className="acoes-pedido">

                          <button
                            type="button"
                            className="botao-whatsapp"
                            onClick={() =>
                              abrirWhatsAppCliente(pedido)
                            }
                          >
                            📱 Conversar com cliente
                          </button>

                          <button
                            type="button"
                            className="botao-encerrar"
                            onClick={() =>
                              encerrarPedido(pedido)
                            }
                          >
                            ✓ Encerrar pedido
                          </button>

                        </div>

                      </div>

                    )}

                    {pedido.status === 'ENCERRADO' && (

                      <div className="pedido-encerrado">

                        <p>
                          <strong>
                            ✓ Pedido encerrado
                          </strong>
                        </p>

                        {pedido.observacoes && (
                          <p>
                            <strong>
                              Observação do encerramento:
                            </strong>{' '}
                            {pedido.observacoes}
                          </p>
                        )}

                      </div>

                    )}

                  </article>

                ))}

              </div>

            )}

        </section>

      </section>

      {/* MODAL DE ACEITE */}

      {pedidoWhatsApp && (

        <div className="modal-whatsapp">

          <div className="modal-whatsapp-conteudo">

            <h2>
              Aceitar pedido
            </h2>

            <p>
              Informe o WhatsApp que será utilizado
              para entrar em contato com o cliente.
            </p>

            <input
              type="tel"
              value={whatsappPrestador}
              onChange={(event) =>
                setWhatsappPrestador(event.target.value)
              }
              placeholder="Digite o WhatsApp"
            />

            <div className="modal-whatsapp-acoes">

              <button
                type="button"
                onClick={() => {
                  setPedidoWhatsApp(null);
                  setWhatsappPrestador('');
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarAceite}
              >
                Confirmar aceite
              </button>

            </div>

          </div>

        </div>

      )}

      {/* MODAL DE RECUSA */}

      {pedidoRecusa && (

        <div className="modal-whatsapp">

          <div className="modal-whatsapp-conteudo">

            <h2>
              Recusar pedido
            </h2>

            <p>
              Informe o motivo da recusa para o cliente.
            </p>

            <textarea
              value={motivoRecusa}
              onChange={(event) =>
                setMotivoRecusa(event.target.value)
              }
              placeholder="Digite o motivo da recusa..."
              rows="5"
            />

            <div className="modal-whatsapp-acoes">

              <button
                type="button"
                onClick={() => {
                  setPedidoRecusa(null);
                  setMotivoRecusa('');
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarRecusa}
              >
                Confirmar recusa
              </button>

            </div>

          </div>

        </div>

      )}

      {/* MODAL DE ENCERRAMENTO */}

      {pedidoEncerramento && (

        <div className="modal-whatsapp">

          <div className="modal-whatsapp-conteudo">

            <h2>
              Encerrar pedido
            </h2>

            <p>
              Informe uma observação sobre o encerramento
              do serviço.
            </p>

            <textarea
              value={observacaoEncerramento}
              onChange={(event) =>
                setObservacaoEncerramento(event.target.value)
              }
              placeholder="Digite a observação do encerramento..."
              rows="5"
            />

            <div className="modal-whatsapp-acoes">

              <button
                type="button"
                onClick={() => {
                  setPedidoEncerramento(null);
                  setObservacaoEncerramento('');
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarEncerramento}
              >
                Confirmar encerramento
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default PrestadorHome;