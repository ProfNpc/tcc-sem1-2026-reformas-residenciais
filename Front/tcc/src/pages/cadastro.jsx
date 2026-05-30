
/*function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setcpf] = useState('')
  const [telefone, settelefone] = useState('')

  async function handleCadastro() {
    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          email,
          cpf,
          telefone
        })
      })

      if (response.ok) {
        alert('Cadastro realizado com sucesso')
      } else {
        alert('Erro ao cadastrar')
      }

    } catch (error) {
      console.error(error)
      alert('Erro na requisição')
    }
  }

  return (
    <div className="form-container">

      <h2>Cadastro de Pessoas</h2>

      <div className="input-group">
        <label>Nome</label>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>cpf</label>
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setcpf(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>telefone</label>
        <input
          type="text"
          placeholder="telefone"
          value={telefone}
          onChange={(e) => settelefone(e.target.value)}
        />
      </div>



      <button
        className="btn-submit"
        onClick={handleCadastro}
      >
        Cadastrar
      </button>

    </div>
  )
}

export default Cadastro*/
/*import { useState } from 'react'*/

/*daqui em diante e como estava 25/05
*
*
*

import '../cadastro.css'
import axios from "axios"
import { useEffect, useState } from "react"



function Cadastro() {

  const [pessoas, setPessoas] = useState([])

  useEffect(() => {

    axios.get("http://localhost:8080/Pessoas")
      .then((response) => {

        console.log(response.data)

        setPessoas(response.data)
      })
      .catch((error) => {

        console.log(error)
      })

  }, [])

  return (
    <div>

      <h1>Backend conectado</h1>

      {pessoas.map((pessoas) => (
        <div key={pessoas.id}>
          <p>{pessoas.nome}</p>
        </div>
      ))}

    </div>
  )
}

export default Cadastro

**************************/







 
import '../cadastro.css'
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Cadastro() {

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
              <Link to="/Login">
                Voltar para Login
              </Link>
            </span>

    </main>

  );
}

export default Cadastro;



























