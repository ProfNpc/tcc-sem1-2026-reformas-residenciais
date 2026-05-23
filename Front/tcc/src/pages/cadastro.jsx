import { useState } from 'react'
import '../cadastro.css'

function Cadastro() {
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

export default Cadastro