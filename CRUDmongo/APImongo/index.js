import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import User from './models/User.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Permite requisições de outras origens

// Rotas
app.get("/users", async (request, response) => {
    try {
        const users = await User.find(); // Busca todos os usuários
        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.post("/users", async (request, response) => {
    try {
        const user = request.body;
        const newUser = await User.create(user); // Cria um novo usuário
        return response.status(201).json(newUser);
    } catch (error) {
        return response.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
    }
});

// Conexão com o MongoDB
mongoose.connect("mongodb+srv://mongo:mongoso@cluster0.pjqam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Banco Conectado!'))
    .catch((error) => console.error('Erro ao conectar ao banco:', error));

// Inicialização do servidor
app.listen(8800, () => {
    console.log("Servidor rodando na porta 8800!");
});
