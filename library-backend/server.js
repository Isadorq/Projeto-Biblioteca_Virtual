const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect('mongodb+srv://isa:salsicha@biblioteca.jve9d.mongodb.net/?retryWrites=true&w=majority&appName=Biblioteca', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Importação das rotas
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// Definir a porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});