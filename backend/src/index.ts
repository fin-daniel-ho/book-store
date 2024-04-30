import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import booksRouter from './routers/books/books.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json());

// Use books router
app.use('/api/books', booksRouter);

/**
 * Starts the server and listens for incoming requests.
 * @param {number} port - The port number to listen on.
 * @returns {void}
 */
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});