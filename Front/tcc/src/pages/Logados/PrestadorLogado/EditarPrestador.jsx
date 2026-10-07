
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditarPrestador.css';

function EditarPrestador() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    cep: '',
    telefone: '',
    endereco: '',
    email: '',
    cnpj: '',
    servico1: '',
    servico2: '',
    servico3: '',
    informacoesComplementares: ''
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {

    const usuarioSalvo =
      localStorage.getItem('usuarioLogado');

    if (!usuarioSalvo) {
      navigate('/login');
      return;
    }

    const usuarioLogado =
      JSON.parse(usuarioSalvo);

    if (usuarioLogado.tipoUsuario !== 'prestador') {
      navigate('/login');
      return;
    }

    setUsuario(usuarioLogado);

    const idPrestador =
      usuarioLogado.idPrestador ?? usuarioLogado.id;

    if (!idPrestador) {
      alert('Não foi possível identificar o prestador.');
      navigate('/login');
      return;
    }

    const buscarPrestador = async () => {

      try {

        const resposta = await fetch(
          `http://127.0.0.1:8089/Prestador/${idPrestador}`
        );

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível carregar os dados do prestador.'
          );
        }

        const prestador =
          await resposta.json();

        setFormulario({
          nome: prestador.nome || '',
          cpf: prestador.cpf || '',
          cep: prestador.cep || '',
          telefone: prestador.telefone || '',
          endereco: prestador.endereco || '',
          email: prestador.email || '',
          cnpj: prestador.cnpj || '',
          servico1: prestador.servico1 || '',
          servico2: prestador.servico2 || '',
          servico3: prestador.servico3 || '',
          informacoesComplementares:
            prestador.informacoesComplementares || ''
        });

      } catch (error) {

        console.error(
          'Erro ao buscar prestador:',
          error
        );

        alert(
          'Não foi possível carregar os dados do prestador.'
        );

        navigate('/Logados');

      } finally {

        setCarregando(false);

      }

    };

    buscarPrestador();

  }, [navigate]);

  const alterarCampo = (event) => {

    const { name, value } = event.target;

    setFormulario((formularioAtual) => ({
      ...formularioAtual,
      [name]: value
    }));

  };

  const salvar = async (event) => {

    event.preventDefault();

    if (!usuario) {
      return;
    }

    const idPrestador =
      usuario.idPrestador ?? usuario.id;

    setSalvando(true);

    try {

      const dadosParaEnviar = {

        nome: formulario.nome,
        cpf: formulario.cpf,

        cep: formulario.cep,
        telefone: formulario.telefone,
        endereco: formulario.endereco,
        email: formulario.email,

        cnpj: formulario.cnpj,

        servico1: formulario.servico1,
        servico2: formulario.servico2,
        servico3: formulario.servico3,

        informacoesComplementares:
          formulario.informacoesComplementares

      };

      const resposta = await fetch(
        `http://127.0.0.1:8089/Prestador/${idPrestador}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(dadosParaEnviar)
        }
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível atualizar os dados.'
        );
      }

      const prestadorAtualizado =
        await resposta.json();

      const usuarioAtualizado = {
        ...usuario,
        nome: prestadorAtualizado.nome
      };

      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify(usuarioAtualizado)
      );

      alert(
        'Dados atualizados com sucesso!'
      );

      navigate('/Logados');

    } catch (error) {

      console.error(
        'Erro ao atualizar prestador:',
        error
      );

      alert(
        'Não foi possível atualizar os dados.'
      );

    } finally {

      setSalvando(false);

    }

  };

  if (carregando) {

    return (
      <main className="editar-prestador">

        <div className="editar-prestador-carregando">
          Carregando dados...
        </div>

      </main>
    );

  }

  return (

    <main className="editar-prestador">

      <section className="editar-prestador-container">

        <div className="editar-prestador-cabecalho">

          <button
            type="button"
            className="botao-voltar"
            onClick={() => navigate('/Logados')}
          >
            ← Voltar
          </button>

          <h1>
            Editar meus dados
          </h1>

          <p>
            Atualize suas informações profissionais.
          </p>

        </div>

        <form
          className="formulario-prestador"
          onSubmit={salvar}
        >

          <div className="campo-formulario">

            <label htmlFor="nome">
              Nome
            </label>

            <input
              id="nome"
              name="nome"
              type="text"
              value={formulario.nome}
              onChange={alterarCampo}
              required
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="cpf">
              CPF
            </label>

            <input
              id="cpf"
              name="cpf"
              type="text"
              value={formulario.cpf}
              disabled
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="cnpj">
              CNPJ
            </label>

            <input
              id="cnpj"
              name="cnpj"
              type="text"
              value={formulario.cnpj}
              disabled
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="cep">
              CEP
            </label>

            <input
              id="cep"
              name="cep"
              type="text"
              value={formulario.cep}
              onChange={alterarCampo}
              required
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="telefone">
              Telefone
            </label>

            <input
              id="telefone"
              name="telefone"
              type="text"
              value={formulario.telefone}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formulario.email}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-formulario campo-largo">

            <label htmlFor="endereco">
              Endereço
            </label>

            <input
              id="endereco"
              name="endereco"
              type="text"
              value={formulario.endereco}
              onChange={alterarCampo}
            />

          </div>

          <div className="separador-formulario">

            <h2>
              Informações profissionais
            </h2>

          </div>

          <div className="campo-formulario">

            <label htmlFor="servico1">
              Serviço 1
            </label>

            <input
              id="servico1"
              name="servico1"
              type="text"
              value={formulario.servico1}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="servico2">
              Serviço 2
            </label>

            <input
              id="servico2"
              name="servico2"
              type="text"
              value={formulario.servico2}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-formulario">

            <label htmlFor="servico3">
              Serviço 3
            </label>

            <input
              id="servico3"
              name="servico3"
              type="text"
              value={formulario.servico3}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-formulario campo-largo">

            <label htmlFor="informacoesComplementares">
              Informações complementares
            </label>

            <textarea
              id="informacoesComplementares"
              name="informacoesComplementares"
              value={formulario.informacoesComplementares}
              onChange={alterarCampo}
              rows="5"
              placeholder="Informe detalhes sobre seus serviços..."
            />

          </div>

          <div className="acoes-formulario">

            <button
              type="button"
              className="botao-cancelar"
              onClick={() => navigate('/Logados')}
              disabled={salvando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botao-salvar"
              disabled={salvando}
            >
              {salvando
                ? 'Salvando...'
                : 'Salvar alterações'}
            </button>

          </div>

        </form>

      </section>

    </main>

  );
}

export default EditarPrestador;