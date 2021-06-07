// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Book } = require('../models');
const { findOne } = require('../models/User');

// Controllers
const index = async (req, res) => {
    console.log('inside of api/books')
    try {
        const allBooks = await Book.find({})
        res.json({books: allBooks})
    } catch (error) {
        console.log('---Error inside of /api/books');
        console.log(error);
        return res.status(400).json({message: 'Books not found'})
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const thisBook = await Book.findById(id)
        res.json({book: thisBook})
    } catch (error) {
        console.log('---Error inside of /api/books/:id---')
        console.log(error)
        return res.status(400).json({ message: 'Book not found. Try again...'})
    }
}

const create = async (req, res) => {
    const {title, pages, ISBN, author, price, genre} = req.body
    
    try {
        const newBook = await Book.create({
            title, pages, ISBN, author, price, genre
        })
        console.log('new book created', newBook)
        res.json({book: newBook})
    } catch (error) {
        console.log('---Error inside of POST of /api/books---')
        console.log(error)
        return res.status(400).json({message: 'Book not created. Try again'})
    }
}

const update = async (req, res) => {
    const {title, author, pages, genre, price, ISBN} = req.body
    try {
        const updatedBook= await Book.updateOne({title}, {$set: {author: author, pages: pages, genre: genre, price: price, ISBN: ISBN}})
        const book = await Book.findOne({title})

        res.redirect(`/api/books/${book.id}`)
    } catch (error) {
        console.log('---Error inside of PIT route---')
        console.log(error)
        return res.status(400).json({message: 'Book could not be updated. Try again.'})
    }
}

const deleteBook = async (req, res) => {
    const {id} = req.params
    try {
        console.log(id)
        const deletedBook = await Book.deleteOne({_id: id})
        res.redirect('/api/books')
    } catch (error) {
        console.log('--- Error inside of DELETE route---')
        console.log(error)
        return res.status(400).json({ message: 'Book not deleted. Try again.'})
    }
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Books endpoint OK!'});
});

router.get('/', passport.authenticate('jwt', {session: false}), index);
router.get('/:id', passport.authenticate('jwt', {session: false}), show);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.put('/', passport.authenticate('jwt', { session: false }), update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;