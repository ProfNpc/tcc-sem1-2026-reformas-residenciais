import './deletar.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function index() {
    const { id } = useParams(); // pega o ID da URL
    const navigate = useNavigate();

    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [loading, setLoading] = useState(true);

    // Buscar pessoa pelo ID
    useEffect(() => {
        if (id) {
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
        }
    }, [id]);

    // Função para deletar
    const deletarPessoa = () => {
        fetch(`http://127.0.0.1:8089/Pessoa/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            alert("Pessoa deletada com sucesso!");
            navigate("//PesquisaGeral"); // redireciona para pagina login
        })
        .catch(err => console.error("Erro ao deletar:", err));
    };

    // Loading
    if (loading) {
        return <p>Carregando...</p>;
    }

    // Caso não encontre
    if (!itemSelecionado) {
        return <p>Pessoa não encontrada.</p>;
    }

    return (
        <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3 className='textoDeletar'>Confirmar exclusão do cadastro abaixo</h3>

            <table className='deletar'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>cpf</th>
                        <th>telefone</th>
                        <th>email</th>
                        <th>Endereco</th>
                        
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{itemSelecionado.nome}</td>
                        <td>{itemSelecionado.cpf}</td>
                        <td>{itemSelecionado.telefone}</td>
                        <td>{itemSelecionado.email}</td>
                        <td>{itemSelecionado.endereco}</td>
                    </tr>
                </tbody>
            </table>

            <br />
            <div className='botoes'>
            <button className='btn-ConfDeletar' onClick={deletarPessoa} style={{ background: "red", color: "white" }}>
                Deletar
            </button>

            <button className='btn-CancelDeletar' onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
                Cancelar
            </button>
            </div>
        </div>
    );
}

export default index;