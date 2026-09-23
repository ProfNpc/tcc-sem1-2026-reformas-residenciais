import './cadastroPessoa.css';
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function CadastroPrestador() {

  const { tipo } = useParams();
  const navigate = useNavigate();

  const tiposServico = [
    { valor: 'Eletricista', nome: 'Eletricista' },
    { valor: 'Encanador', nome: 'Encanador' },
    { valor: 'Gesseiro', nome: 'Gesseiro' },
    { valor: 'Marceneiro', nome: 'Marceneiro' },
    { valor: 'Marido de Aluguel', nome: 'Marido de Aluguel' },
    { valor: 'Montador de Móveis', nome: 'Montador de Móveis' },
    { valor: 'Mudanças e Carretos', nome: 'Mudanças e Carretos' },
    { valor: 'Pedreiro', nome: 'Pedreiro' },
    { valor: 'Pintor', nome: 'Pintor' },
    { valor: 'Serralheiro', nome: 'Serralheiro' },
    { valor: 'Tapeceiro', nome: 'Tapeceiro' },
    { valor: 'Vidraceiro', nome: 'Vidraceiro' }
  ];

  const tipoInicial = tipo
    ? tiposServico.find(
        (servico) =>
          servico.valor.toLowerCase() === tipo.toLowerCase()
      )?.valor || ''
    : '';

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    CNPJ: '',
    cep: '',

    // Novo
    servicos: tipoInicial ? [tipoInicial] : [],
    informacoesComplementares: ''
  });

  const [novoServico, setNovoServico] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Adiciona um serviço
  const adicionarServico = () => {

    if (!novoServico) {
      setErro('Selecione um tipo de serviço.');
      return;
    }

    if (form.servicos.includes(novoServico)) {
      setErro('Esse serviço já foi adicionado.');
      return;
    }

    if (form.servicos.length >= 3) {
      setErro('Você pode cadastrar no máximo 3 tipos de serviço.');
      return;
    }

    setForm({
      ...form,
      servicos: [...form.servicos, novoServico]
    });

    setNovoServico('');
    setErro('');
  };

  // Remove um serviço
  const removerServico = (servicoRemover) => {

    setForm({
      ...form,
      servicos: form.servicos.filter(
        (servico) => servico !== servicoRemover
      )
    });
  };

  const salvarPrestador = () => {

    setErro('');
    setSucesso('');

    // Validação
    if (form.servicos.length === 0) {
      setErro('Cadastre pelo menos um tipo de serviço.');
      return;
    }

    if (form.servicos.length > 3) {
      setErro('Você pode cadastrar no máximo 3 tipos de serviço.');
      return;
    }

    fetch('http://127.0.0.1:8089/Prestador', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
  ...form,

  servico1: form.servicos[0] || null,
  servico2: form.servicos[1] || null,
  servico3: form.servicos[2] || null
})

    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Erro ao salvar prestador');
        }

        return response.json();

      })

      .then((prestador) => {

        const idPrestador = prestador.id;

        console.log("Prestador salvo:", prestador);
        console.log("ID do prestador:", idPrestador);
        console.log("Serviços:", form.servicos);
        console.log("Informações:", form.informacoesComplementares);

        if (!idPrestador) {
          throw new Error(
            'Prestador foi salvo, mas o ID não foi retornado pelo servidor.'
          );
        }

        setSucesso('Prestador cadastrado com sucesso!');

        alert('Prestador cadastrado com sucesso!');

        setForm({
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          endereco: '',
          CNPJ: '',
          cep: '',
          servicos: [],
          informacoesComplementares: ''
        });

        navigate(`/usuarios/${tipo}`, {
          state: {
            idPrestador: idPrestador
          }
        });

      })

      .catch((error) => {

        console.error(error);

        setErro(error.message);
        setSucesso('');

      });
  };

  return (

    <main>

      <div className="container-form">
        <h2>Novo Cadastro</h2>
      </div>

      {erro && (
        <h3 style={{ color: 'red' }}>
          {erro}
        </h3>
      )}

      {sucesso && (
        <h3 style={{ color: 'green' }}>
          {sucesso}
        </h3>
      )}

      <div>

        <div className="main-content">
          Cadastro de Prestador
        </div>

        <form>

          {/* NOME */}
          <div className="form-group">
            <label>Nome</label>

            <input
              type="text"
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value
                })
              }
              placeholder="Nome"
              required
            />
          </div>

          {/* CPF */}
          <div className="form-group">
            <label>CPF</label>

            <input
              type="text"
              value={form.cpf}
              onChange={(e) =>
                setForm({
                  ...form,
                  cpf: e.target.value
                })
              }
              placeholder="CPF"
            />
          </div>

          {/* TELEFONE */}
          <div className="form-group">
            <label>Telefone</label>

            <input
              type="text"
              value={form.telefone}
              onChange={(e) =>
                setForm({
                  ...form,
                  telefone: e.target.value
                })
              }
              placeholder="Telefone"
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              placeholder="Email"
            />
          </div>

          {/* ENDEREÇO */}
          <div className="form-group">
            <label>Endereço</label>

            <input
              type="text"
              value={form.endereco}
              onChange={(e) =>
                setForm({
                  ...form,
                  endereco: e.target.value
                })
              }
              placeholder="Endereço"
            />
          </div>

          {/* CEP */}
          <div className="form-group">
            <label>CEP</label>

            <input
              type="text"
              value={form.cep}
              onChange={(e) =>
                setForm({
                  ...form,
                  cep: e.target.value
                })
              }
              placeholder="CEP"
            />
          </div>

          {/* CNPJ */}
          <div className="form-group">
            <label>CNPJ</label>

            <input
              type="text"
              value={form.CNPJ}
              onChange={(e) =>
                setForm({
                  ...form,
                  CNPJ: e.target.value
                })
              }
              placeholder="CNPJ"
            />
          </div>


          {/* =============================== */}
          {/* TIPOS DE SERVIÇO */}
          {/* =============================== */}

          <div className="form-group">

            <label>
              Tipos de serviço
            </label>

            <p>
              Cadastre até 3 tipos de serviço que você oferece.
            </p>

            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>

              <select
                value={novoServico}
                onChange={(e) => setNovoServico(e.target.value)}
                disabled={form.servicos.length >= 3}
              >

                <option value="">
                  Selecione um serviço
                </option>

                {tiposServico.map((servico) => (
                  <option
                    key={servico.valor}
                    value={servico.valor}
                  >
                    {servico.nome}
                  </option>
                ))}

              </select>

              <button
                type="button"
                onClick={adicionarServico}
                disabled={form.servicos.length >= 3}
              >
                + Adicionar
              </button>

            </div>

          </div>


          {/* SERVIÇOS ADICIONADOS */}

          {form.servicos.length > 0 && (

            <div className="servicos-selecionados">

              <label>
                Serviços cadastrados ({form.servicos.length}/3)
              </label>

              {form.servicos.map((servico) => (

                <div
                  key={servico}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px',
                    marginTop: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '6px'
                  }}
                >

                  <span>
                    {servico}
                  </span>

                  <button
                    type="button"
                    onClick={() => removerServico(servico)}
                    style={{
                      color: 'red',
                      cursor: 'pointer'
                    }}
                  >
                    Remover
                  </button>

                </div>

              ))}

            </div>

          )}


          {/* =============================== */}
          {/* INFORMAÇÕES COMPLEMENTARES */}
          {/* =============================== */}

          <div className="form-group">

            <label>
              Informações complementares
            </label>

            <textarea
              value={form.informacoesComplementares}
              onChange={(e) =>
                setForm({
                  ...form,
                  informacoesComplementares: e.target.value
                })
              }
              placeholder="Conte um pouco mais sobre seus serviços, experiência, formas de atendimento, horários, regiões onde atende, etc."
              rows="6"
            />

          </div>

        </form>

        <br />

        <div className="button-container">

          <button
            type="button"
            onClick={salvarPrestador}
          >
            Cadastrar Prestador
          </button>

        </div>

      </div>

    </main>
  );
}

export default CadastroPrestador;