import './cadastroPessoa.css'
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

function Index() {

  const { tipo } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    endereco: '',
    cep: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleChange = (campo, valor) => {
    setForm({
      ...form,
      [campo]: valor
    });
  };

  const salvarPessoa = () => {

    fetch('http://127.0.0.1:8089/Pessoa', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(form)

    })

      .then((response) => {

        if (!response.ok) {
          throw new Error('Erro ao salvar pessoa');
        }

        return response.json();

      })

      // ALTERAÇÃO: recebe a pessoa salva pelo backend
      .then((pessoa) => {

        // ALTERAÇÃO: pega o ID da pessoa/cliente
        const idCliente = pessoa.id;

        console.log("Pessoa salva:", pessoa);
        console.log("ID do cliente:", idCliente);

        // Verifica se o backend retornou o ID
        if (!idCliente) {
          throw new Error(
            'Cliente foi salvo, mas o ID não foi retornado pelo servidor.'
          );
        }

        setSucesso('Pessoa cadastrada com sucesso!');

        //alert("Pessoa cadastrada com sucesso");

        // limpa formulário
        setForm({
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          senha: '',
          endereco: '',
          cep: ''
        });

        // ALTERAÇÃO:
        // Abre Usuarios levando o ID do cliente
        navigate(`/usuarios/${tipo}`, {
          state: {
            idCliente: idCliente
          }
        });

      })

      .catch((error) => {

        console.error(error);

        setErro(error.message);
        setSucesso('');

      });
  };

  return (

    <main>

      <div className="container-form">

        <h2>Novo Cadastro</h2>

      </div>

      {erro && <h3 style={{ color: 'red' }}>{erro}</h3>}
      {sucesso && <h3 style={{ color: 'green' }}>{sucesso}</h3>}

      <div>

        <div className="main-content">
          Cadastro de Clientes
        </div>

        <form>

          <div className="form-group">
            <label>Nome</label>

            <input
              type="text"
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value
                })
              }
              placeholder="Nome"
              required
            />
          </div>

          <div className="form-group">
            <label>CPF</label>

            <input
              type="number"
              value={form.cpf}
              onChange={(e) =>
                setForm({
                  ...form,
                  cpf: e.target.value
                })
              }
              placeholder="CPF"
            />
          </div>

          <div className="form-group">
            <label>telefone</label>

            <input
              type="text"
              value={form.telefone}
              onChange={(e) =>
                setForm({
                  ...form,
                  telefone: e.target.value
                })
              }
              placeholder="TELEFONE"
            />
          </div>

          <div className="form-group">
            <label>cep</label>

            <input
              type="text"
              value={form.cep}
              onChange={(e) =>
                setForm({
                  ...form,
                  cep: e.target.value
                })
              }
              placeholder="CEP"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="text"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              placeholder="EMAIL"
              className="EMAIL"
            />
          </div>

          <div className="form-group">
            <label>endereço</label>

            <input
              type="text"
              value={form.endereco}
              onChange={(e) =>
                setForm({
                  ...form,
                  endereco: e.target.value
                })
              }
              placeholder="ENDEREÇO"
              className="input-number"
            />
          </div>

          <br></br>

        </form>

        <div className="button-container">

          <button
            type="button"
            onClick={salvarPessoa}
          >
            Continuar cadastro
          </button>

        </div>

      </div>

      {tipo === 'adm' && (
        <span>
          <Link to="/PesquisaGeral">
            Voltar
          </Link>
        </span>
      )}

    </main>

  );
}

export default Index;
