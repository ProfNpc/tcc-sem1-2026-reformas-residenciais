import '../cadastro.css'
/*import React, { useState } from 'react';*/

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function PesID() {


  const [data, setData] = useState([]); // Initialize state for data
   const [cpfdigitado, setcpfdigitado] = useState('') //pegar o cpf
   const [mostrarTabelaGet, setMostrarTabelaGet] = useState(true) //estado para deixa mostrar ou ocultar a tabela inicia como visivel true
    const [mostrarTabelaPut, setMostrarTabelaPut] = useState(false) //estado para deixa mostrar ou ocultar a tabela inicia como visivel true
    const [itemSelecionado, setItemSelecionado] = useState(null)

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:8089/Pessoa')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
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
</div>
      <br></br>


      {cpfdigitado && (
          <p style={{ color: 'red', marginBottom: '10px' }}>
          {cpfdigitado}
          </p>
        )}

{/*

    {mostrarTabelaPut && (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome teste</th>
          <th>cpf</th>
          <th>telefone</th>
            <th>email</th>
            <th>Endereco</th>
              <th>senha</th>
      
        </tr>
      </thead>
      <tbody>

        
        {data.map((item) => (
         <tr key={item.id}> 
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.cpf}</td>
            <td>{item.telefone}</td>
              <td>{item.email}</td>
              <td>{item.endereco}</td>
               <td>{item.senha}</td>

                   


          </tr>
        ))} 

        </tbody>
      </table>
  )}







*/}






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
      
        </tr>
      </thead>
      <tbody>
        {/* Use .map() to loop through the array and render rows */}
        {data.map((item) => ( 
          <tr key={item.id}> 
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.cpf}</td>
            <td>{item.telefone}</td>
              <td>{item.email}</td>
              <td>{item.endereco}</td>
               <td>{item.senha}</td>

                    <td>
      <button className='delPut'
        /*onClick={() => alert(`Editar cpf: ${item.cpf}`)}*/
        onClick={() => {
        setMostrarTabelaGet(false)
       setItemSelecionado(item)
      }}
             
       
      >
         Atualizar
      </button>

      
    
      <button className='delPut'
        /*onClick={() => alert(`Editar cpf: ${item.cpf}`)}*/
        onClick={() => 
       alert(`Deletar  cpf:  ${item.cpf}` + ` Nome: ${item.nome}` + '?')}
      
             
      
      >
         Delete
      </button>
    </td>


    


          </tr>
        ))}

        </tbody>
      </table>
  )}

{itemSelecionado && (
  <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}>
    <h3>Dados selecionados</h3>
  <table>
      <thead>
        <tr>
          
          <th>Nome:</th>
          <th>cpf:</th>
        </tr>
</thead>

<tbody>
<tr>
    <td>{itemSelecionado.nome}</td>
    <td>{itemSelecionado.cpf}</td>
</tr>
    </tbody>

     </table>
  </div>

 
)}



    </main> 
  ) 



}
export default PesID;


