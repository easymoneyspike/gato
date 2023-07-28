import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true },
        senha: { type: String, required: true },
        age: {type: Number, required: true}
    },
    { versionKey: false }
)

const User = mongoose.model('usuarios', UserSchema)

export default User;