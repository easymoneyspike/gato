import { useState } from "react"; // useState do React
import InputField from "./InputField.jsx"; // componente de Input
import '../styles/Formulario.css'; // importando estilos css
import Botao from "./Botao.jsx"; // componente de Botao

import axios from 'axios'; // importando o axios

const Formulario = () => {

  const [error, setError] = useState();

  const [values, setValues] = useState({
    nome: '',
    email: '',
    senha: '',
    age: ''
  });

  const HandleChange = (value) => {

    setError('');

    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }))
  }

  const HandleClick = (event) => {
    event.preventDefault();

    if (!values.nome || !values.email || !values.senha || !values.age) {
      setError('Por favor, preencha todos os campos.'); // Definir a mensagem de erro no estado do erro
      return; // Impedir o envio da requisição caso haja campos vazios
    }

    // faz a requisição POST para a API
    axios.post('http://localhost:8800/usuarios', values)
      .then((response) => {
        setError('bem vindo, sua conta foi criada!');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Definir o erro retornado pela API no estado do erro
        } else {
          setError('Ocorreu um erro ao enviar os dados para a API.'); // Caso o erro não esteja formatado conforme esperado
        }
        console.error('Ocorreu um erro ao enviar os dados para a API:', error);
      });

    console.log(values);
  }


  return (
    <>
      <form action="http://localhost:8800/usuarios" method="POST" className="form">
        <h1>Faça Registro</h1>
        <span className="subtitle">faça a diferença.</span>
        <InputField label="nome" type="text" name="nome" placeholder="james" onChange={HandleChange} />
        <InputField label="email" type="email" name="email" placeholder="xxxx@xxxx.com" onChange={HandleChange} />
        <InputField label="senha" type="password" name="senha" placeholder="xxxxxxx!@#" onChange={HandleChange} />
        <InputField label="idade" type="data" name="age" placeholder="18" onChange={HandleChange} />

        <span className={`error-message ${error ? 'show' : ''}`}>
          {error}
          {error && error.includes('cadastrado') && <span><a className="error-login" href="/">fazer login?</a></span>}
        </span>




        <Botao text="Criar Perfil" click={HandleClick} />


        <div className="suporte">
          <span><a href="/">não tenho uma conta</a></span>
          <span className="barra"></span>
          <span><a href="/">esqueci a senha</a></span>
        </div>
      </form>
    </>
  )
}

export default Formulario;

