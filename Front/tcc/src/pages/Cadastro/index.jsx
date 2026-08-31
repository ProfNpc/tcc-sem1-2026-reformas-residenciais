import './cadastroPessoa.css'
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Index() {

  // FORMULÁRIO (sempre vazio no início)
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Atualiza campos
  const handleChange = (campo, valor) => {
    setForm({
      ...form,
      [campo]: valor
    });
  };

  // FUNÇÃO POST
  const salvarPessoa = () => {

    //fetch('http://localhost:8089/pessoa', {
      fetch ('http://127.0.0.1:8089/Pessoa',{

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

      .then(() => {
        setSucesso('Pessoa cadastrada com sucesso!');
        alert("Pessoa cadastrada com sucesso");
       
      

        // limpa formulário
        setForm({
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          senha: '',
          endereco: ''
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
      <div className="main-content">Cadastro de pessoa</div>
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
              required />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              type="number"
              value={form.cpf}
             onChange={(e) =>
                setForm({ ...form, cpf: e.target.value })
              }
              placeholder="CPF"/>
          </div>

          <div className="form-group">
            <label>telefone</label>
            <input
              type="text"
              value={form.telefone}
             onChange={(e) =>
                setForm({ ...form, telefone: e.target.value })
              }
              placeholder="TELEFONE"/>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={form.Email}
             onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="EMAIL"
              className="EMAIL"/>
          </div>

          <div className="form-group">
            <label>endereço</label>
            <input
              type="text"
              value={form.endereco}
             onChange={(e) =>
                setForm({ ...form, endereco: e.target.value })
              }
              placeholder="ENDEREÇO"
              className="input-number"/>
          </div>

          <div className="form-group">
            <label>senha</label>
            <input
              type="password"
              value={form.senha}
             onChange={(e) =>
                setForm({ ...form, senha: e.target.value })
              }
              className="input-number"/>
          </div>

         {/* <div className="form-group">
            <label>Status</label>
            <select className="status-select">
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>*/}

        

      <br></br>

        </form>

       <div className="button-container">
  <button type="button" onClick={salvarPessoa}>
    Salvar
  </button>
</div>

      </div>
      
        <span>             
              <Link to="/PesquisaGeral">
                Voltar
              </Link>
            </span>

    </main>

  );
}

export default Index;



























