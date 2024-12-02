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

app.put("/users/:id", async (req, res) => {
    try {
      const { id } = req.params; // ID do usuário a ser atualizado
      const updatedUser = req.body; // Novos dados do usuário
  
      // Atualiza o usuário pelo ID
      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
  
      return res.status(200).json(user); // Retorna o usuário atualizado
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar usuário", details: error.message });
    }
  });
  
  app.delete("/users/:id", async (req, res) => {
    try {
      const { id } = req.params; // ID do usuário a ser deletado
  
      // Remove o usuário pelo ID
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
  
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar usuário", details: error.message });
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
