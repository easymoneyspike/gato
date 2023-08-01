import Formulario from "./Formulario.jsx";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registro = () => {

  const navigate = useNavigate();
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

    if (!values.email.includes('@')) {
      setError('coloque um email válido!')
      return;
    }

    // faz a requisição POST para a API
    axios.post('http://localhost:8800/usuarios', values)
      .then((response) => {
        setError('bem vindo, sua conta foi criada!');
        setTimeout(() => {
          navigate('/login')
        },2000)
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
      <Formulario
        formTitle={"cadastro."}
        buttonTitle={"Criar uma conta"}
        supTitle={"já tenho uma conta"}
        HandleChange={HandleChange}
        HandleClick={HandleClick}
        error={error}
        location={"/login"}
        showAge={true}
        showName={true}
      />
    </>
  )
}

export default Registro;