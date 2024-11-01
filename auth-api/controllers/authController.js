const User = require('../models/user'); // Importa o modelo de usuario
const bcrypt = require('bcryptjs'); // Importa bcrypt paa hash de senhas
const jwt = require('jsonwebtoken');    // Importa jsonwebtoken para criar tokens JWT

// Função para registar novos usuarios
exports.register = async (req, res) => {
    const {username, password} = req.body;  // Pega dados do corpo da requisição


    try {
        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10); // O numero 10 representa o "salt rounds" para tornar o hash mais seguro

        // Cria um novo usuario com nome de usuario e senha criptografada
        const newUser = new User({ username, password: hashedPassword});
        await newUser.save();   // Salva o usuario no banco de dados

        res.status(201).json({message: 'Usuário registrado com sucesso  '});    // Responde com sucesso ao registrar
    }   catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário'});    // Responde com erro ao registrar
    }
};

// Função para fazer login de usuários
exports.login = async (req, res) => {
    const {username, password} = req.body;  // Pega dados do corpo da requisição

    try {
        // Busca o usuário pelo nome de usuário
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado '});    // Retorna erro se o usuário não existir

        // Compara a senha fornecida com a senha armazenada no banco
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });    // Retorna o erro se a seha estiver incorreta

        // Cria o toke JWT para autenticação
        const token = jwt. sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});  // Token expira em 1 hora

        res.json({ token });    // Responde com o token JWT
    }   catch (error) {
        res.status(500).json({ eror: 'Erro ao fazer login '});  // Responde com erro ao fazer login
    }
};

