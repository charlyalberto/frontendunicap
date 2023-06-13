import React, { useState } from 'react';
import './styles.css';
import firebase from '../../../firebase'
import { useNavigate, NavLink } from 'react-router-dom';
import Cadastro from '../Cadastro';


function Entrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, senha);
      const user = firebase.auth().currentUser;

      if (user) {
        navigate("/administracao")
      } else {
        alert('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className='boxContainer'>
      <form className="form" onSubmit={handleSubmit}>
              <h2 className="titleEntrar">Entrar</h2>

        <label className='labelEntrar' htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input"
        />
        <label className='labelEntrar' htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          className="input"
        />
        <button type="submit" className="buttonEntrar">
          Entrar
        </button>
      </form>

      <p className='pEntrar'>Não possui conta ainda? <NavLink to="/cadastro" className='spanEntrar'>Cadastre-se</NavLink></p>
      </div>
    </div>
  );
}

export default Entrar;
