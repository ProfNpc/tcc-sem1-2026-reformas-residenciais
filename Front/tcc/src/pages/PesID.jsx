import '../cadastro.css'
/*import React, { useState } from 'react';*/

import React, { useState, useEffect } from 'react';

function PesID() {


  const [data, setData] = useState([]); // Initialize state for data

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:8080/Pessoa')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return ( 
    <main> 
      <h2>Pessoas cadastradas</h2> 
      
    

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>cpf</th>
          <th>telefone</th>
            <th>email</th>
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
          </tr>
        ))}

        </tbody>
      </table>

    </main> 
  ) 



}
export default PesID;


