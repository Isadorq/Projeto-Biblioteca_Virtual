const mongoose = require('mongoose');

// Define o esquema de usuario
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, // Nome de usuario obrigatorio e unico
    password: {type: String, required: true},   // Senha obrigatória
});

// Exporta o modelo de usuário
module.exports = mongoose.model('User', userSchema)