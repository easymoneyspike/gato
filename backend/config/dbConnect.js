import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.STRING_CONEXAO);
const db = mongoose.connection;

export default db;