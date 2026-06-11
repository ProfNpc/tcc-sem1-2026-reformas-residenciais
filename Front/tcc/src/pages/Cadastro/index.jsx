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

    fetch('http://localhost:8089/pessoa', {
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
        setErro('');

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

        <table>

          <tbody>

            <tr>

              <td>
                <label>Nome:</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                />
              </td>

              <td>
                <label>CPF:</label>
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                />
              </td>

              <td>
                <label>Telefone:</label>
                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                />
              </td>

            

              <td>
                <label>Email:</label>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </td>

                <td>    
              <label>Endereço:</label>           
              <input
              type="text"
              value={form.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}/>            
              </td> 




                <td>    
              <label>Senha:</label>           
              <input
              type="password"
              value={form.senha}
              onChange={(e) => handleChange('senha', e.target.value)}/>            
              </td> 



            </tr>

          </tbody>

        </table>

      <br></br>

        <button onClick={salvarPessoa}>
          Salvar
        </button>   
        
      </div>
      <br></br>

      <span>             
              <Link to="/PesquisaGeral">
                Voltar
              </Link>
            </span>

    </main>

  );
}

export default Index;



























