import './cadastroPessoa.css'
import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

function CadastroPrestador() {

  const { tipo } = useParams();

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    CNPJ: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const salvarPrestador = () => {

    fetch('http://127.0.0.1:8089/Prestador', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)

    })

      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao salvar prestador');
        }

        return response.json();
      })

      .then(() => {

        setSucesso('Prestador cadastrado com sucesso!');
        alert('Prestador cadastrado com sucesso!');

        setForm({
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          endereco: '',
          CNPJ: ''
        });

      })

      .catch((error) => {
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
          Cadastro de Prestador
        </div>

        <form>

          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) =>
                setForm({ ...form, nome: e.target.value })
              }
              placeholder="Nome"
              required
            />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              value={form.cpf}
              onChange={(e) =>
                setForm({ ...form, cpf: e.target.value })
              }
              placeholder="CPF"
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="text"
              value={form.telefone}
              onChange={(e) =>
                setForm({ ...form, telefone: e.target.value })
              }
              placeholder="Telefone"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              value={form.endereco}
              onChange={(e) =>
                setForm({ ...form, endereco: e.target.value })
              }
              placeholder="Endereço"
            />
          </div>

          <div className="form-group">
            <label>CNPJ</label>
            <input
              type="text"
              value={form.CNPJ}
              onChange={(e) =>
                setForm({ ...form, CNPJ: e.target.value })
              }
              placeholder="CNPJ"
            />
          </div>

        </form>

        <br />

        <div className="button-container">
          <button
            type="button"
            onClick={salvarPrestador}
          >
            Avançar
          </button>
        </div>

      </div>

      {/*<span>
        <Link to="/PesquisaGeral">
          Voltar
        </Link>
      </span>*/}

    </main>

  );
}

export default CadastroPrestador;