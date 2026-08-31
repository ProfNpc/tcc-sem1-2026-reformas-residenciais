import './atualizar.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function PesquisaDeletados() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemSelecionado, setItemSelecionado] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: ""
  });

  const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch(`http://127.0.0.1:8089/Pessoa/${id}`)

      
        .then(resp => resp.json())
        .then(json => {
          setItemSelecionado(json);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erro ao buscar pessoa:", err);
          setLoading(false);
        });
    }, [id]);

  const atualizar = () => {
    fetch(`http://127.0.0.1:8089/Pessoa/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(itemSelecionado)
      })
      .then(resp => {
        if (!resp.ok) {
          throw new Error("Erro ao atualizar");
        }

          alert("Pessoa atualizada com sucesso!");
          navigate("/PesquisaGeral");
      })
      .catch(err => console.error("Erro ao atualizar:", err));
    };

    if (loading) {
        return <p>Carregando...</p>;
    }
    return (
      <main className="atualizar">

        <div className="container-form">
          <h2>Atualizar Cadastro</h2>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Nome:</label>
                <input
                  value={itemSelecionado.nome}
                    onChange={(e) =>
                      setItemSelecionado({
                      ...itemSelecionado,
                      nome: e.target.value
                    })
                  }
                />
              </td>

              <td>
                <label>CPF:</label>
                <input
                  value={itemSelecionado.cpf}
                  onChange={(e) =>
                    setItemSelecionado({
                      ...itemSelecionado,
                      cpf: e.target.value
                    })
                  }
                />
              </td>

              <td>
                <label>Telefone:</label>
                <input
                  value={itemSelecionado.telefone}
                  onChange={(e) =>
                    setItemSelecionado({
                      ...itemSelecionado,
                      telefone: e.target.value
                    })
                  }
                />
              </td>
              <td>
                <label>Email:</label>
                <input
                  value={itemSelecionado.email}
                  onChange={(e) =>
                    setItemSelecionado({
                      ...itemSelecionado,
                      email: e.target.value
                    })
                  }
                />
              </td>

              <td>
                <label>Endereço:</label>
                <input
                  value={itemSelecionado.endereco}
                  onChange={(e) =>
                    setItemSelecionado({
                      ...itemSelecionado,
                      endereco: e.target.value
                    })
                  }
                />
              </td>

            </tr>
          </tbody>
        </table>

  <br />

        <button onClick={atualizar}>
          Atualizar
        </button>

        <button className='btn-cancelarAtu' onClick={() => navigate(-1)}>
          Cancelar
        </button>

      </main>
    );
}

export default PesquisaDeletados;