import React, { useState } from 'react';
import './styles.css';
import firebase from '../../../firebase';
import { useNavigate } from "react-router-dom";

function Cadastro() {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email !== emailConfirm) {
      console.log('Os emails não coincidem');
      return;
    }

    if (senha !== senhaConfirm) {
      console.log('As senhas não coincidem');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário cadastrado:', user);
        navigate("/administracao");
      })
      .catch((error) => {
        console.error('Erro de cadastro:', error);
      });
  };

  return (
    <div className="formContainer">
      <div className='cadastroBoxContainer'>
      <form className="form" onSubmit={handleSubmit}>
              <h2 className="cadastroTitle">Cadastro</h2>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input"
          />
          <label htmlFor="emailConfirm">Confirmar Email:</label>
          <input
            type="email"
            id="emailConfirm"
            value={emailConfirm}
            onChange={(event) => setEmailConfirm(event.target.value)}
            className="input"
          />
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="input"
          />
          <label htmlFor="senhaConfirm">Confirmar Senha:</label>
          <input
            type="password"
            id="senhaConfirm"
            value={senhaConfirm}
            onChange={(event) => setSenhaConfirm(event.target.value)}
            className="input"
          />
          <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(event) => setTipoUsuario(event.target.value)}
            className="input"
          >
            <option value="">Selecione</option>
            <option value="gerente">Gerente</option>
            <option value="funcionario">Funcionário</option>
            <option value="cozinheiro">Cozinheiro</option>
          </select>
        <button type="submit" className="cadastroButton">
          Cadastrar
        </button>
      </form>
      </div>
    </div>
  );
}

export default Cadastro;
