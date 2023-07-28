import usuarios from '../models/UserSchema.js'

export const getUsers = async (req, res) => {
    const todosUsuarios = await usuarios.find();

    try {
        res.status(200).json(todosUsuarios);
    } catch (err) {
        res.status(500).json('não foi possível buscar os usuários :(');
    }
}

export const getUsersByID = async (req, res) => {
    const { id } = req.params;

    try{
        const usuarioPorID = await usuarios.findById(id);

        if(!usuarioPorID){
            res.status(404).json('usuário não encontrado!')
        }else{
            res.status(200).json(usuarioPorID);
        }
    }catch(err){
        res.status(500).json('não foi possível buscar esse usuário :(');
    }
}

export const addUsers = async (req, res) => {
    const { nome, email, senha, age } = req.body;

    try {
        // verificar se o email já existe na lista de usuários
        const usuarioExistente = await usuarios.findOne({ email });

        if (usuarioExistente) {
            // se o email já existir, retorna a mensagem de que já existe
            res.status(409).json({ message: 'o email já está cadastrado :( ' });
        } else {
            // se o email não existir, cria um novo usuário
            const novoUsuario = new usuarios({ nome, email, senha, age });
            await novoUsuario.save();
            res.status(200).json('usuário criado, bem vindo :)');
        }
    } catch (err) {
        // em caso de erro, retorna uma resposta de erro
        res.status(500).json({ message: 'não foi possível criar uma conta.' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try{
        const usuarioDeletar = await usuarios.findByIdAndDelete(id);
        if(!usuarioDeletar){
            res.status(404).json('usuário não encontrado, verifique o ID passado!')
        }else{
            res.status(200).json(`usuário excluído permanentemente - email da conta exclída: ${usuarioDeletar.email}`)
        }
    }catch(err){
        res.status(500).json('não foi possível exluir o usuário :(')
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params; // id do usuario que quer atualizar
    const { nome, email, senha, age } = req.body; // novos dados a ser atualizados

    try{
        const usuarioAtualizar = await usuarios.findByIdAndUpdate(id, { nome, email, senha, age }, {new: true});
        res.status(200).json(usuarioAtualizar)
    }catch(err){
        res.status(500).json('não foi possível atualizar o usuário :( - ' + err)
    }

}


