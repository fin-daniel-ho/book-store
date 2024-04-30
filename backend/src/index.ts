
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Book } from './models/book';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5500;
const dbFilePath = path.join('db.json');

// Middleware
app.use(bodyParser.json());

let books: Book[] = [];

const loadBooks = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        books = JSON.parse(data).books;
    } catch (err) {
        console.error('Error loading books:', err);
    }
};

const saveBooks = () => {
    try {
        const data = JSON.stringify({ books }, null, 2);
        fs.writeFileSync(dbFilePath, data);
    } catch (err) {
        console.error('Error saving books:', err);
    }
};

loadBooks();

// GET request to retrieve the message indicating the purpose of the application
/**
 * Retrieves the message indicating the purpose of the application.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Book store management');
});

// GET request to retrieve all books in the collection
/**
 * Retrieves all books from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Book[]}
 */
app.get('/api/books', (req: express.Request, res: express.Response) => {
    res.json(books);
});

// GET request to retrieve a specific book by its ID
/**
 * Retrieves a specific book from the database by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Book|Object}
 * If book is found: Returns JSON object representing the book.
 * If book is not found: Returns error message.
 */
app.get('/api/books/:id', (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// POST request to add a new book to the collection
/**
 * Adds a new book to the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Book}
 * Returns JSON object representing the newly added book.
 */
app.post('/api/books', (req: express.Request, res: express.Response) => {
    const { title, author, description } = req.body;
    const id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    const newBook = { id, title, author, description };
    books.push(newBook);
    saveBooks();
    res.status(201).json(newBook);
});

// PUT request to update an existing book in the collection
/**
 * Updates an existing book in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Book|Object}
 * If book is found: Returns JSON object representing the updated book.
 * If book is not found: Returns void.
 */
app.put('/api/books/:id', (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index] = { id, ...req.body };
        saveBooks();
        res.json(books[index]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// PATCH request to partially update an existing book in the collection
/**
 * Partially updates an existing book in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Book|Object}
 * If book is found: Returns JSON object representing the updated book.
 * If book is not found: Returns void.
 */
app.patch('/api/books/:id', (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...req.body };
        saveBooks();
        res.json(books[index]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// DELETE request to delete a book from the collection
/**
 * Deletes a book from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void|Object}
 */
app.delete('/api/books/:id', (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        saveBooks();
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Server listening on the specified port
/**
 * Starts the server and listens for incoming requests.
 * @param {number} port - The port number to listen on.
 * @returns {void}
 */
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});