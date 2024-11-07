const express = require('express'); // Importa o express
const router = express.Router();    // Cria um roteador do express
const authController = require('../controllers/authController');    

// Rota para registrar novos usuarios 
router.post('/register', authController.register);

// Rota para login de usuarios
router.post('/login', authController.login)

module.exports = router;    // Exporta o roteador para uso no app.js