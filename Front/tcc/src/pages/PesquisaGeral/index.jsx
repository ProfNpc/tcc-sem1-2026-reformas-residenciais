/*import '../../geral.css'*/
/*import React, { useState } from 'react';*/

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function index() {
  const [data, setData] = useState([]); // Initialize state for data
  const [cpfdigitado, setcpfdigitado] = useState('') //pegar o cpf
  const [mostrarTabelaGet, setMostrarTabelaGet] = useState(true) //estado para deixa mostrar ou ocultar a tabela inicia como visivel true
  const [mostrarTabelaPut, setMostrarTabelaPut] = useState(false) //estado para deixa mostrar ou ocultar a tabela inicia como visivel true
  const [itemSelecionado, setItemSelecionado] = useState(null)

  const carregarPessoas = () => {
    // Fetch data when the component mounts
    fetch('http://127.0.0.1:8089/Pessoa')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error carregar dados:', error));
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

 function mostracpf() {
    e.preventDefault()
     if (usuario === "21499657803") {
      setcpfdigitado(alert('É necessário digitar usuário e senha' + cpf))
    return
    }
  }

  return ( 
    <main> 
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2>Pessoas cadastradas</h2>

        <Link to="/Cadastro">
          <button>
            + Novo Cadastro
          </button>
        </Link>     

        <Link to="/PesquisaDeletados">
          <button>
            Visualizar pessoas deletadas
          </button>
        </Link>
      </div>
 <br></br>

      {cpfdigitado && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          {cpfdigitado}
        </p>
      )}
      {mostrarTabelaGet && (
        <table>
          <thead>        
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>cpf</th>
              <th>telefone</th>
              <th>email</th>
              <th>Endereco</th>
              <th>senha</th>
              <th>Ações</th>      
            </tr>
          </thead>
          <tbody>
          {/* Use .map() to loop through the array and render rows */}
            {data
              .filter(item => item.deletado !== 'SIM')
              .map((item) => ( 
                <tr key={item.id}> 
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.cpf}</td>
                  <td>{item.telefone}</td>
                  <td>{item.email}</td>
                  <td>{item.endereco}</td>
                  <td >{"******".repeat(item.senha?.length || 0)}</td>
                  <td>            
                    <Link to={`/Atualizar/${item.id}`}>              
                  
                      <button className='btnAcao'>
                        atualizar
                      </button>
                    </Link>

                    <Link to={`/deletar/${item.id}`}>                
                      <button className='btnAcao'>
                        Deletar
                      </button>
                    </Link>
                  </td>

                </tr>
      ))}
          </tbody>
        </table>
  )}
    </main> 
  ) 
}
export default index;


