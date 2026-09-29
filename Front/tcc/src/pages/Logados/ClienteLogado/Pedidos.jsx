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


  const enviarPedido = async (event) => {

    event.preventDefault();

    setErro('');

    const usuarioSalvo =
      localStorage.getItem('usuarioLogado');

    if (!usuarioSalvo) {
      setErro('Usuário não está logado.');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    const idCliente =
      usuario.idCliente ?? usuario.id;

    if (!idCliente) {
      setErro('Não foi possível identificar o cliente.');
      return;
    }

    const pedido = {
      idCliente: idCliente,
      idPrestador: Number(idPrestador),
      servico: decodeURIComponent(servico),
      descricao: descricao,
      endereco: endereco,
      dataDesejada: dataDesejada,
      observacoes: observacoes
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
          body: JSON.stringify(pedido)
        }
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível enviar o pedido.'
        );
      }

      const pedidoSalvo = await resposta.json();

      console.log('Pedido salvo:', pedidoSalvo);

      alert('Pedido enviado com sucesso!');

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


        <form onSubmit={enviarPedido}>

          <div className="campo">

            <label htmlFor="descricao">
              Descrição do serviço
            </label>

            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) =>
                setDescricao(event.target.value)
              }
              placeholder="Descreva o serviço que você precisa..."
              required
            />

          </div>


          <div className="campo">

            <label htmlFor="endereco">
              Endereço
            </label>

            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(event) =>
                setEndereco(event.target.value)
              }
              placeholder="Digite o endereço onde o serviço será realizado"
              required
            />

          </div>


          <div className="campo">

            <label htmlFor="dataDesejada">
              Data desejada
            </label>

            <input
              type="date"
              id="dataDesejada"
              value={dataDesejada}
              onChange={(event) =>
                setDataDesejada(event.target.value)
              }
              required
            />

          </div>


          <div className="campo">

            <label htmlFor="observacoes">
              Observações
            </label>

            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(event) =>
                setObservacoes(event.target.value)
              }
              placeholder="Digite alguma observação, se necessário..."
            />

          </div>


          {erro && (

            <div className="pedido-erro">
              {erro}
            </div>

          )}


          <button
            type="submit"
            className="botao-enviar-pedido"
            disabled={enviando}
          >
            {enviando
              ? 'Enviando...'
              : 'Enviar pedido'}
          </button>

        </form>

      </section>

    </main>

  );
}

export default Pedidos;