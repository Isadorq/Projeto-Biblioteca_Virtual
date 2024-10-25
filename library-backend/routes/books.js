const express = require('express');
const Book = require('../models/Books');
const router = express.Router();

// ** CRIAÇÃO (POST) ** 
router.post('/', async (req, res) => { 
    const { title, author, year } = req.body; 
    try { 
        const newBook = new Book({ title, author, year }); // Criando uma nova instância do modelo 
        await newBook.save(); 
        res.status(201).json(newBook); 
    } catch (error) { 
        res.status(500).json({ message: 'Erro ao criar livro', error }); 
    } 
}); 

// ** LEITURA (GET) ** 
router.get('/', async (req, res) => { 
    try { 
        const books = await Book.find(); 
        res.status(200).json(books); 
    } catch (error) { 
        res.status(500).json({ message: 'Erro ao buscar livros', error }); 
    } 
}); 

// ** ATUALIZAÇÃO (PUT) ** 
router.put('/:id', async (req, res) => { 
    const { title, author, year } = req.body; 
    try { 
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true }); 
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json(updatedBook); 
    } catch (error) { 
        res.status(500).json({ message: 'Erro ao atualizar livro', error }); 
    } 
}); 

// ** EXCLUSÃO (DELETE) **  
router.delete('/:id', async (req, res) => { 
    try { 
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro deletado com sucesso' }); 
    } catch (error) { 
        res.status(500).json({ message: 'Erro ao deletar livro', error }); 
    } 
}); 

module.exports = router;