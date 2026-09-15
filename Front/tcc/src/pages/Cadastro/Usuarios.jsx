import './cadastroPessoa.css'
import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

function Usuarios() {

  const { tipo } = useParams();

  const [form, setForm] = useState({

    senha: '',
    confirmaSenha: '',
    tipousuario: tipo
   
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const salvarPrestador = () => {

    fetch('http://127.0.0.1:8089/Usuarios', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)

    })

      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao salvar usuarios');
        }

        return response.json();
      })

      .then(() => {

        setSucesso('usuarios cadastrado com sucesso!');
        alert('usuarios cadastrado com sucesso!');

        setForm({
          senha: '',
          confirmaSenha: '',
          tipousuario: tipo
         
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
        <h2>NOVO CADASTRO</h2>
      </div>

      {erro && <h3 style={{ color: 'red' }}>{erro}</h3>}
      {sucesso && <h3 style={{ color: 'green' }}>{sucesso}</h3>}

      <div>

        <div className="main-content">
          Cadastro de Acesso
        </div>

        <form>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="text"
              value={form.senha}
              onChange={(e) =>
                setForm({ ...form, senha: e.target.value })
              }
              placeholder="Senha"
              required
            />
          </div>

          <div className="form-group">
            <label>confirmaSenha</label>
            <input
              type="text"
              value={form.confirmaSenha}
              onChange={(e) =>
                setForm({ ...form, confirmaSenha: e.target.value })
              }
              placeholder="Confirma Senha"
            />
          </div>

          <div className="form-group">
            <label>Tipo Usuario</label>
            <input
              type="text"
              value={form.tipousuario}
              onChange={(e) =>
                setForm({ ...form, tipousuario: e.target.value })
              }
              placeholder="Tipo Usuario"
            />
          </div>

 

         

        </form>

        <br />

        <div className="button-container">
          <button
            type="button"
            onClick={salvarPrestador}
          >
            salvar
          </button>
        </div>

      </div>

      
    </main>

  );
}

export default Usuarios;