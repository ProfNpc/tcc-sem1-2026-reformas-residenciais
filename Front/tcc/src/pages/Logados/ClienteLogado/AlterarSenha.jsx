
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlterarSenha.css';

function AlterarSenha() {
  const navigate = useNavigate();

  const usuarioSalvo = localStorage.getItem('usuarioLogado');
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [salvando, setSalvando] = useState(false);

  const tipoUsuario = usuario?.tipoUsuario?.toLowerCase();

  const voltar = () => {
    if (tipoUsuario === 'prestador') {
      navigate('/prestador');
    } else {
      navigate('/Logados');
    }
  };

  const alterarSenha = async (event) => {
    event.preventDefault();

    if (!usuario || !['cliente', 'prestador'].includes(tipoUsuario)) {
      alert('Faça login novamente.');
      navigate('/login');
      return;
    }

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert('Preencha todos os campos.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }

    if (novaSenha === senhaAtual) {
      alert('A nova senha deve ser diferente da atual.');
      return;
    }

    const idUsuario =
      usuario.usuarioId ??
      usuario.idUsuario ??
      usuario.id;

    if (!idUsuario) {
      alert('Não foi possível identificar seu usuário. Faça login novamente.');
      return;
    }

    try {
      setSalvando(true);

      const resposta = await fetch(
        `http://127.0.0.1:8089/Usuarios/${idUsuario}/alterar-senha`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            senhaAtual,
            novaSenha
          })
        }
      );

      const mensagem = await resposta.text();

      if (!resposta.ok) {
        throw new Error(
          mensagem || 'Não foi possível alterar a senha.'
        );
      }

      alert('Senha alterada com sucesso!');

      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');

      voltar();

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert(error.message || 'Erro ao alterar senha.');

    } finally {
      setSalvando(false);
    }
  };

  if (!usuario || !['cliente', 'prestador'].includes(tipoUsuario)) {
    return null;
  }

  return (
    <main className="alterar-senha">

      <div className="alterar-senha-card">

        <div className="alterar-senha-header">

          <h1>Alterar senha</h1>

          <p>
            Atualize sua senha de acesso ao Reforma Fácil.
          </p>

        </div>

        <form onSubmit={alterarSenha}>

          <div className="campo-senha">

            <label>Senha atual</label>

            <input
              type="password"
              value={senhaAtual}
              onChange={(event) => setSenhaAtual(event.target.value)}
              placeholder="Digite sua senha atual"
              autoComplete="current-password"
              required
            />

          </div>

          <div className="campo-senha">

            <label>Nova senha</label>

            <input
              type="password"
              value={novaSenha}
              onChange={(event) => setNovaSenha(event.target.value)}
              placeholder="Digite sua nova senha"
              autoComplete="new-password"
              required
            />

          </div>

          <div className="campo-senha">

            <label>Confirmar nova senha</label>

            <input
              type="password"
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
              placeholder="Digite novamente sua nova senha"
              autoComplete="new-password"
              required
            />

          </div>

          <div className="botoes-senha">

            <button
              type="button"
              className="botao-cancelar"
              onClick={voltar}
              disabled={salvando}
            >
              Voltar
            </button>

            <button
              type="submit"
              className="botao-salvar"
              disabled={salvando}
            >
              {salvando ? 'Alterando...' : 'Alterar senha'}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AlterarSenha;
