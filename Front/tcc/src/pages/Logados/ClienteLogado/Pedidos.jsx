import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Pedidos.css';

function Pedidos() {

  const { idPrestador, servico } = useParams();
  const navigate = useNavigate();

  const [prestador, setPrestador] = useState(null);

  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataDesejada, setDataDesejada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [whatsappCliente, setWhatsappCliente] = useState('');

  // Dados do CEP
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  // Controla a tela de endereço
  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [enderecoConfirmado, setEnderecoConfirmado] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');


  // Busca o prestador pelo ID
  useEffect(() => {

    const buscarPrestador = async () => {

      try {

        const resposta = await fetch(
          `http://127.0.0.1:8089/Prestador/${idPrestador}`
        );

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível carregar o prestador.'
          );
        }

        const dados = await resposta.json();

        setPrestador(dados);

      } catch (error) {

        console.error(
          'Erro ao buscar prestador:',
          error
        );

      }

    };

    buscarPrestador();

  }, [idPrestador]);


  // Pesquisa o CEP no ViaCEP
  const pesquisarEndereco = async () => {

    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {

      alert('Digite um CEP válido com 8 números.');

      return;
    }

    try {

      setBuscandoCep(true);

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      if (!resposta.ok) {

        throw new Error(
          'Erro ao consultar o CEP.'
        );

      }

      const dados = await resposta.json();

      if (dados.erro) {

        alert('CEP não encontrado.');

        return;
      }

      setLogradouro(dados.logradouro || '');
      setBairro(dados.bairro || '');
      setCidade(dados.localidade || '');
      setUf(dados.uf || '');

      // Abre somente a tela do endereço
      setMostrarEndereco(true);

    } catch (error) {

      console.error(
        'Erro ao buscar CEP:',
        error
      );

      alert(
        'Não foi possível consultar o CEP. Tente novamente.'
      );

    } finally {

      setBuscandoCep(false);

    }

  };


  // Confirma o endereço
  const confirmarEndereco = () => {

    if (!numero.trim()) {

      alert(
        'Digite o número do endereço.'
      );

      return;
    }

    const cepFormatado =
      cep
        .replace(/\D/g, '')
        .replace(
          /^(\d{5})(\d{3})$/,
          '$1-$2'
        );

    const enderecoCompleto =
      `${logradouro}, ${numero}, ${bairro}, ${cidade} - ${uf}, ${cepFormatado}`;

    setEndereco(enderecoCompleto);

    setEnderecoConfirmado(true);

    setMostrarEndereco(false);

  };


  // Cancela a pesquisa do endereço
  const cancelarEndereco = () => {

    setMostrarEndereco(false);

  };


  // Permite pesquisar outro endereço
  const alterarEndereco = () => {

    setEndereco('');
    setEnderecoConfirmado(false);

    setNumero('');
    setLogradouro('');
    setBairro('');
    setCidade('');
    setUf('');

  };


  // Envia o pedido
  const enviarPedido = async (event) => {

    event.preventDefault();

    setErro('');

    const usuarioSalvo =
      localStorage.getItem('usuarioLogado');

    if (!usuarioSalvo) {

      setErro(
        'Usuário não está logado.'
      );

      return;
    }

    const usuario =
      JSON.parse(usuarioSalvo);

    const idCliente =
      usuario.idCliente ?? usuario.id;

    if (!idCliente) {

      setErro(
        'Não foi possível identificar o cliente.'
      );

      return;
    }

    const pedido = {

      idCliente: idCliente,

      idPrestador: Number(idPrestador),

      servico:
        decodeURIComponent(servico),

      descricao:
        descricao,

      endereco:
        endereco,

      dataDesejada:
        dataDesejada,

      observacoes:
        observacoes,

      whatsappCliente:
        whatsappCliente

    };


    try {

      setEnviando(true);

      const resposta = await fetch(
        'http://127.0.0.1:8089/Pedidos',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body:
            JSON.stringify(pedido)
        }
      );

      if (!resposta.ok) {

        throw new Error(
          'Não foi possível enviar o pedido.'
        );

      }

      const pedidoSalvo =
        await resposta.json();

      console.log(
        'Pedido salvo:',
        pedidoSalvo
      );

      alert(
        'Pedido enviado com sucesso!'
      );

      navigate('/Logados');

    } catch (error) {

      console.error(
        'Erro ao enviar pedido:',
        error
      );

      setErro(
        'Não foi possível enviar o pedido. Tente novamente.'
      );

    } finally {

      setEnviando(false);

    }

  };


  return (

    <main className="pedidos-page">

      <header className="pedidos-header">

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <h1>
          Solicitar serviço
        </h1>

      </header>


      <section className="pedidos-conteudo">

        <h2>
          Solicitação de serviço
        </h2>


        <div className="pedido-informacoes">

          <p>
            <strong>Serviço:</strong>{' '}
            {decodeURIComponent(servico)}
          </p>

          <p>
            <strong>Prestador:</strong>{' '}
            {prestador
              ? prestador.nome
              : 'Carregando...'}
          </p>

        </div>


        {/* FORMULÁRIO NORMAL */}

        {!mostrarEndereco && (

          <form onSubmit={enviarPedido}>

            {/* DESCRIÇÃO */}

            <div className="campo">

              <label htmlFor="descricao">
                Descrição do serviço
              </label>

              <textarea
                id="descricao"
                value={descricao}
                onChange={(event) =>
                  setDescricao(
                    event.target.value
                  )
                }
                placeholder="Descreva o serviço que você precisa..."
                required
              />

            </div>


            {/* CEP */}

            <div className="campo">

              <label htmlFor="cep">
                CEP
              </label>

              <input
                type="text"
                id="cep"
                value={cep}
                onChange={(event) => {

                  const valor =
                    event.target.value;

                  setCep(valor);

                  if (
                    valor.replace(/\D/g, '').length !== 8
                  ) {

                    setEndereco('');
                    setEnderecoConfirmado(false);

                  }

                }}
                placeholder="Digite o CEP"
                maxLength="9"
                required
              />

            </div>


            {/* ENDEREÇO */}

            <div className="campo">

              <label htmlFor="endereco">
                Endereço
              </label>

              <div className="endereco-linha">

                <input
                  type="text"
                  id="endereco"
                  value={endereco}
                  placeholder="Pesquise o endereço pelo CEP"
                  disabled
                />

                <div className="botoes-endereco">

                  <button
                    type="button"
                    className="btn-endereco"
                    onClick={pesquisarEndereco}
                    disabled={buscandoCep}
                  >
                    {buscandoCep
                      ? 'Pesquisando...'
                      : 'Pesquisar endereço'}
                  </button>


                  {enderecoConfirmado && (

                    <button
                      type="button"
                      className="btn-alterar-endereco"
                      onClick={alterarEndereco}
                    >
                      Alterar endereço
                    </button>

                  )}

                </div>

              </div>

            </div>


            {/* DATA */}

            <div className="campo">

              <label htmlFor="dataDesejada">
                Data desejada
              </label>

              <input
                type="date"
                id="dataDesejada"
                value={dataDesejada}
                onChange={(event) =>
                  setDataDesejada(
                    event.target.value
                  )
                }
                disabled={!enderecoConfirmado}
                required
              />

            </div>


            {/* WHATSAPP */}

            <div className="campo">

              <label htmlFor="whatsappCliente">
                WhatsApp para contato
              </label>

              <input
                type="tel"
                id="whatsappCliente"
                value={whatsappCliente}
                onChange={(event) =>
                  setWhatsappCliente(
                    event.target.value
                  )
                }
                placeholder="Digite o WhatsApp para contato"
                disabled={!enderecoConfirmado}
                required
              />

              <small>
                Informe o número de WhatsApp que será utilizado pelo prestador para entrar em contato sobre este pedido.
              </small>

            </div>


            {/* OBSERVAÇÕES */}

            <div className="campo">

              <label htmlFor="observacoes">
                Observações
              </label>

              <textarea
                id="observacoes"
                value={observacoes}
                onChange={(event) =>
                  setObservacoes(
                    event.target.value
                  )
                }
                placeholder="Digite alguma observação, se necessário..."
                disabled={!enderecoConfirmado}
              />

            </div>


            {/* ERRO */}

            {erro && (

              <div className="pedido-erro">
                {erro}
              </div>

            )}


            {/* BOTÃO ENVIAR */}

            <button
              type="submit"
              className="botao-enviar-pedido"
              disabled={
                enviando ||
                !enderecoConfirmado
              }
            >
              {enviando
                ? 'Enviando...'
                : 'Enviar pedido'}
            </button>

          </form>

        )}


        {/* TELA DE ENDEREÇO */}

        {mostrarEndereco && (

          <div className="endereco-pesquisa">

            <h2>
              Confirmar endereço para atendimento
            </h2>


            <div className="campo">

              <label>
                CEP
              </label>

              <input
                type="text"
                value={cep}
                disabled
              />

            </div>


            <div className="campo">

              <label>
                Rua
              </label>

              <input
                type="text"
                value={logradouro}
                disabled
              />

            </div>


            <div className="campo">

              <label htmlFor="numero">
                Número
              </label>

              <input
                type="text"
                id="numero"
                value={numero}
                onChange={(event) =>
                  setNumero(
                    event.target.value
                  )
                }
                placeholder="Digite o número"
                autoFocus
              />

            </div>


            <div className="campo">

              <label>
                Bairro
              </label>

              <input
                type="text"
                value={bairro}
                disabled
              />

            </div>


            <div className="campo">

              <label>
                Cidade
              </label>

              <input
                type="text"
                value={`${cidade} - ${uf}`}
                disabled
              />

            </div>


            <div className="endereco-acoes">

              <button
                type="button"
                className="botao-cancelar-endereco"
                onClick={cancelarEndereco}
              >
                Cancelar
              </button>


              <button
                type="button"
                className="botao-confirmar-endereco"
                onClick={confirmarEndereco}
              >
                Confirmar endereço
              </button>

            </div>

          </div>

        )}

      </section>

    </main>

  );
}

export default Pedidos;