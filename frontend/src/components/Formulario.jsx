import InputField from "./InputField.jsx"; // componente de Input
import '../styles/Formulario.css'; // importando estilos css
import Botao from "./Botao.jsx"; // componente de Botao

const Formulario = ({
  formTitle,
  buttonTitle,
  supTitle,
  HandleChange,
  HandleClick,
  error,
  location,
  endPoint,
  errorIncludes,
  errorLinkHref,
  errorLinkText,
  showName,
  showAge
}) => {

  return (
    <>
      <form action={`http://localhost:8800/usuarios${endPoint}`}
        method="POST" className="form">
        <h1>Faça {formTitle}</h1>
        <span className="subtitle">faça a diferença.</span>

        {showName &&
          <InputField label="nome" type="text" name="nome" placeholder="james" onChange={HandleChange} />}
        {showAge &&
          <InputField label="idade" type="data" name="age" placeholder="18" onChange={HandleChange} required={true} />
        }
        <InputField label="email" type="email" name="email" placeholder="xxxx@xxxx.com" onChange={HandleChange} required={true} />
        <InputField label="senha" type="password" name="senha" placeholder="xxxxxxx!@#" onChange={HandleChange} />

        <span className={`error-message ${error ? 'show' : ''}`}>
          {error}
          {error && error.includes(errorIncludes) && (
            <span>
              <a className="error-login" href={errorLinkHref}>{errorLinkText}</a>
            </span>
          )}
        </span>


        <Botao text={buttonTitle} click={HandleClick} />


        <div className="suporte">
          <span><a href={location}>{supTitle}</a></span>
          <span className="barra"></span>
          <span><a href="/">esqueci a senha</a></span>
        </div>
      </form>
    </>
  )
}

export default Formulario;

