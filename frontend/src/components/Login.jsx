import axios from "axios";
import { useState } from "react";
import Formulario from "./Formulario.jsx";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const [values = {
        email: '',
        senha: '',
    }, setValues] = useState();

    const [error, setError] = useState();

    const HandleChange = (value) => {

        setError('');

        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
    }

    const HandleClick = (e) => {
        e.preventDefault();

        if (!values.email || !values.senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        axios.post('http://localhost:8800/usuarios/login', {
            email: values.email,
            senha: values.senha
        })
            .then((response) => {
                setError('entrando na conta...')
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message)
                } else {
                    setError('não foi possível enviar os dados para a API')
                }
            })

    }

    return (
        <>
            <Formulario
                formTitle="login."
                buttonTitle="Entrar na conta"
                supTitle="não tenho uma conta"
                HandleChange={HandleChange}
                HandleClick={HandleClick}
                error={error}
                location="/registro"
                endPoint="login"
                errorIncludes="não encontrada"
                errorLinkHref="/registro"
                errorLinkText="criar conta?"
                showAge={false}
                showName={false}
            />

        </>
    )
}

export default Login;