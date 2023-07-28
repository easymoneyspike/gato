//dependencias
import express from 'express';
import cors from 'cors';
import db from './config/dbConnect.js';
import user from './routes/user.js';

//iniciando app e definindo porta
const app = express();
const port = process.env.PORT || 8800;

//escutando a porta
app.listen(port, console.log(`http://localhost:${port}`));

//erros do DB
db.on('error', console.error.bind(console, 'bank status: off-ine'));
db.once('open', (err, resp) => console.log('bank status: on-line'));

//configurações do CORS
const corsConfigUsuarios = {
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE, PUT",
    allowedHeaders: 'Content-Type, Authorization',
};


//compatibilidade e funcionalidade
app.use('/usuarios', cors(corsConfigUsuarios)); // Configuração de CORS para as rotas de 'user'
app.use(express.json());
app.use('/usuarios', user); // Use as rotas do arquivo user.js para a rota '/usuarios'




