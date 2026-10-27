import './atualizar.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Atualizar() {
  const { id, tipo } = useParams();
  const navigate = useNavigate();

  const [itemSelecionado, setItemSelecionado] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    cep: '',
    cnpj: '',
    servico1: '',
    servico2: '',
    servico3: '',
    informacoesComplementares: ''
  });

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const ehPrestador = tipo?.toLowerCase() === 'prestador';

  const url = ehPrestador
    ? `http://127.0.0.1:8089/Prestador/${id}`
    : `http://127.0.0.1:8089/Pessoa/${id}`;

  useEffect(() => {
    const buscarCadastro = async () => {
      setLoading(true);
      setErro('');

      try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
          throw new Error('Não foi possível buscar os dados do cadastro.');
        }

        const dados = await resposta.json();

        setItemSelecionado({
          ...dados,
          nome: dados.nome || '',
          cpf: dados.cpf || '',
          telefone: dados.telefone || '',
          email: dados.email || '',
          endereco: dados.endereco || '',
          cep: dados.cep || '',
          cnpj: dados.cnpj || '',
          servico1: dados.servico1 || '',
          servico2: dados.servico2 || '',
          servico3: dados.servico3 || '',
          informacoesComplementares:
            dados.informacoesComplementares || ''
        });
      } catch (error) {
        console.error('Erro ao buscar cadastro:', error);
        setErro('Não foi possível carregar os dados. Verifique o cadastro e tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    buscarCadastro();
  }, [url]);

  const alterarCampo = (campo, valor) => {
    setItemSelecionado((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const atualizar = async (event) => {
    event.preventDefault();

    try {
      const urlAtualizar = ehPrestador
        ? `http://127.0.0.1:8089/Prestador/${id}`
        : `http://127.0.0.1:8089/Pessoa/${id}`;

      const resposta = await fetch(urlAtualizar, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemSelecionado)
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível atualizar o cadastro.');
      }

      alert(
        ehPrestador
          ? 'Prestador atualizado com sucesso!'
          : 'Cliente atualizado com sucesso!'
      );

      navigate('/PesquisaGeral');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Não foi possível atualizar o cadastro. Tente novamente.');
    }
  };

  if (loading) {
    return <p>Carregando dados do cadastro...</p>;
  }

  if (erro) {
    return (
      <main className="atualizar">
        <h2>Erro ao carregar cadastro</h2>
        <p>{erro}</p>

        <button type="button" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </main>
    );
  }

  return (
    <main className="atualizar">
      <div className="container-form">
        <h2>
          Atualizar {ehPrestador ? 'Prestador' : 'Cliente'}
        </h2>
      </div>

      <form onSubmit={atualizar}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="nome">Nome:</label>
                <input
                  id="nome"
                  type="text"
                  value={itemSelecionado.nome}
                  onChange={(e) => alterarCampo('nome', e.target.value)}
                  required
                />
              </td>

              <td>
                <label htmlFor="cpf">CPF:</label>
                <input
                  id="cpf"
                  type="text"
                  value={itemSelecionado.cpf}
                  onChange={(e) => alterarCampo('cpf', e.target.value)}
                />
              </td>

              <td>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  id="telefone"
                  type="text"
                  value={itemSelecionado.telefone}
                  onChange={(e) => alterarCampo('telefone', e.target.value)}
                />
              </td>

              <td>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={itemSelecionado.email}
                  onChange={(e) => alterarCampo('email', e.target.value)}
                />
              </td>

              <td>
                <label htmlFor="endereco">Endereço:</label>
                <input
                  id="endereco"
                  type="text"
                  value={itemSelecionado.endereco}
                  onChange={(e) => alterarCampo('endereco', e.target.value)}
                />
              </td>
            </tr>

            {ehPrestador && (
              <>
                <tr>
                  <td>
                    <label htmlFor="cep">CEP:</label>
                    <input
                      id="cep"
                      type="text"
                      value={itemSelecionado.cep}
                      onChange={(e) => alterarCampo('cep', e.target.value)}
                    />
                  </td>

                  <td>
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                      id="cnpj"
                      type="text"
                      value={itemSelecionado.cnpj}
                      onChange={(e) => alterarCampo('cnpj', e.target.value)}
                    />
                  </td>

                  <td>
                    <label htmlFor="servico1">Serviço 1:</label>
                    <input
                      id="servico1"
                      type="text"
                      value={itemSelecionado.servico1}
                      onChange={(e) => alterarCampo('servico1', e.target.value)}
                    />
                  </td>

                  <td>
                    <label htmlFor="servico2">Serviço 2:</label>
                    <input
                      id="servico2"
                      type="text"
                      value={itemSelecionado.servico2}
                      onChange={(e) => alterarCampo('servico2', e.target.value)}
                    />
                  </td>

                  <td>
                    <label htmlFor="servico3">Serviço 3:</label>
                    <input
                      id="servico3"
                      type="text"
                      value={itemSelecionado.servico3}
                      onChange={(e) => alterarCampo('servico3', e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="5">
                    <label htmlFor="informacoesComplementares">
                      Informações complementares:
                    </label>

                    <textarea
                      id="informacoesComplementares"
                      value={itemSelecionado.informacoesComplementares}
                      onChange={(e) =>
                        alterarCampo('informacoesComplementares', e.target.value)
                      }
                      rows="4"
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <br />

        <button type="submit">
          Atualizar
        </button>

        <button
          type="button"
          className="btn-cancelarAtu"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </form>
    </main>
  );
}

export default Atualizar;