import '../styles/Botao.css'

const Botao = (props) => {
    return(
        <div className="button-field">
        <button onClick={props.click}>
            {props.text}
        </button>
        </div>
    )
}

export default Botao;
