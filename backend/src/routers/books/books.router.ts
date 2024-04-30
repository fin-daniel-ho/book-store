import express from 'express';
import {
    getAllBooksController,
    getBookByIdController,
    addBookController,
    updateBookController,
    deleteBookController,
    updateBookPartialController
} from './books.controller';

const booksRouter = express.Router();

// Define routes
booksRouter.get('/', getAllBooksController);
booksRouter.get('/:id', getBookByIdController);
booksRouter.post('/', addBookController);
booksRouter.put('/:id', updateBookController);
booksRouter.patch('/:id', updateBookPartialController);
booksRouter.delete('/:id', deleteBookController);

export default booksRouter;
