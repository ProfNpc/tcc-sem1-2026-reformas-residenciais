
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditarCliente.css';

function EditarCliente() {

  const navigate = useNavigate();

  const usuarioSalvo =
    localStorage.getItem('usuarioLogado');

  const usuario =
    usuarioSalvo
      ? JSON.parse(usuarioSalvo)
      : null;

  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    cep: '',
    telefone: '',
    endereco: '',
    email: ''
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {

    if (!usuario || usuario.tipoUsuario !== 'cliente') {
      navigate('/login');
      return;
    }

    const buscarCliente = async () => {

      try {

        const idCliente =
          usuario.idCliente ?? usuario.id;

        const resposta = await fetch(
          `http://127.0.0.1:8089/Pessoa/${idCliente}`
        );

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível carregar os dados do cliente.'
          );
        }

        const pessoa = await resposta.json();

        setFormulario({
          nome: pessoa.nome || '',
          cpf: pessoa.cpf || '',
          cep: pessoa.cep || '',
          telefone: pessoa.telefone || '',
          endereco: pessoa.endereco || '',
          email: pessoa.email || ''
        });

      } catch (error) {

        console.error(
          'Erro ao buscar cliente:',
          error
        );

        alert(
          'Não foi possível carregar seus dados.'
        );

      } finally {

        setCarregando(false);

      }

    };

    buscarCliente();

  }, []);

  const alterarCampo = (event) => {

    const { name, value } = event.target;

    setFormulario((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value
    }));

  };

  const salvar = async (event) => {

    event.preventDefault();

    try {

      setSalvando(true);

      const idCliente =
        usuario.idCliente ?? usuario.id;

      const dadosParaEnviar = {
        nome: formulario.nome,
        cpf: formulario.cpf,
        cep: formulario.cep,
        telefone: formulario.telefone,
        endereco: formulario.endereco,
        email: formulario.email
      };

      const resposta = await fetch(
        `http://127.0.0.1:8089/Pessoa/${idCliente}`,
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

      const pessoaAtualizada =
        await resposta.json();

      // Atualiza somente os dados do cliente no login
      const usuarioAtualizado = {
        ...usuario,
        nome: pessoaAtualizada.nome
      };

      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify(usuarioAtualizado)
      );

      alert(
        'Seus dados foram atualizados com sucesso!'
      );

      navigate('/Logados');

    } catch (error) {

      console.error(
        'Erro ao atualizar cliente:',
        error
      );

      alert(
        'Não foi possível atualizar seus dados.'
      );

    } finally {

      setSalvando(false);

    }

  };

  if (!usuario || usuario.tipoUsuario !== 'cliente') {
    return null;
  }

  if (carregando) {

    return (
      <main className="editar-cliente">
        <div className="editar-cliente-card">
          <h2>Carregando seus dados...</h2>
        </div>
      </main>
    );

  }

  return (
    <main className="editar-cliente">

      <div className="editar-cliente-card">

        <div className="editar-cliente-header">

          <h1>
            Editar meus dados
          </h1>

          <p>
            Atualize seus dados de cadastro.
          </p>

        </div>

        <form onSubmit={salvar}>

          <div className="campo-edicao">

            <label>
              Nome
            </label>

            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={alterarCampo}
              required
            />

          </div>

          <div className="campo-edicao">

            <label>
              CPF
            </label>

            <input
              type="text"
              name="cpf"
              value={formulario.cpf}
              disabled
            />

            <small>
              O CPF não pode ser alterado.
            </small>

          </div>

          <div className="campo-edicao">

            <label>
              CEP
            </label>

            <input
              type="text"
              name="cep"
              value={formulario.cep}
              onChange={alterarCampo}
              required
            />

          </div>

          <div className="campo-edicao">

            <label>
              Telefone
            </label>

            <input
              type="text"
              name="telefone"
              value={formulario.telefone}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-edicao">

            <label>
              Endereço
            </label>

            <input
              type="text"
              name="endereco"
              value={formulario.endereco}
              onChange={alterarCampo}
            />

          </div>

          <div className="campo-edicao">

            <label>
              E-mail
            </label>

            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={alterarCampo}
            />

          </div>

          <div className="botoes-edicao">

            <button
              type="button"
              className="botao-cancelar"
              onClick={() =>
                navigate('/Logados')
              }
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

      </div>

    </main>
  );
}

export default EditarCliente;