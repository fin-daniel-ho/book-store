import { Request, Response } from 'express';
import {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    updateBookPartial,
    deleteBook,
} from '../../services/books/books.service';
import { Book } from '../../models/book';

/**
 * Retrieves all books from the collection and sends them as a JSON response.
 * @param req The Express Request object.
 * @param res The Express Response object used to send the books as a JSON response.
 * @returns A Promise<Book[]> that resolves to an array of books.
 */
export const getAllBooksController = async (req: Request, res: Response): Promise<Book[]> => {
    try {
        const books: Book[] = await getAllBooks();
        res.json(books);
        return books;
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
};

/**
 * Retrieves a book by its ID from the collection and sends it as a JSON response.
 * @param req The Express Request object containing the book ID in the URL params.
 * @param res The Express Response object used to send the book as a JSON response.
 * @returns A Promise<Book> that resolves to the retrieved book.
 */
export const getBookByIdController = async (req: Request, res: Response): Promise<Book> => {
    const id: number = parseInt(req.params.id);
    try {
        const book: Book | undefined = await getBookById(id);
        if (book) {
            res.json(book);
            return book;
        } else {
            res.status(404).json({ message: 'Book not found' });
            throw new Error('Book not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
};

/**
 * Adds a new book to the collection and sends it as a JSON response.
 * @param req The Express Request object containing the new book data in the request body.
 * @param res The Express Response object used to send the newly added book as a JSON response.
 * @returns A Promise<Book> that resolves to the newly added book.
 */
export const addBookController = async (req: Request, res: Response): Promise<Book> => {
    const { title, author, description }: { title: string, author: string, description: string } = req.body;
    try {
        const newBook: Book | string = await addBook(title, author, description);
        if (typeof newBook === 'string') {
            res.status(400).json({ message: newBook });
            throw new Error(newBook);
        } else {
            res.status(201).json(newBook);
            return newBook;
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
};

/**
 * Updates an existing book in the collection and sends the updated book as a JSON response.
 * @param req The Express Request object containing the book ID in the URL params and the updated book data in the request body.
 * @param res The Express Response object used to send the updated book as a JSON response.
 * @returns A Promise<Book> that resolves to the updated book.
 */
export const updateBookController = async (req: Request, res: Response): Promise<Book> => {
    const id: number = parseInt(req.params.id);
    const book: Book = req.body;
    try {
        const updatedBook: Book | undefined = await updateBook(id, book);
        if (updatedBook) {
            res.json(updatedBook);
            return updatedBook;
        } else {
            res.status(404).json({ message: 'Book not found' });
            throw new Error('Book not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
};

/**
 * Updates specific fields of an existing book in the collection and sends the updated book as a JSON response.
 * @param req The Express Request object containing the book ID in the URL params and the partial book data in the request body.
 * @param res The Express Response object used to send the updated book as a JSON response.
 * @returns A Promise<Book> that resolves to the updated book.
 */
export const updateBookPartialController = async (req: Request, res: Response): Promise<Book> => {
    const id: number = parseInt(req.params.id);
    const partialBook: Partial<Book> = req.body;
    try {
        const updatedBook: Book | undefined = await updateBookPartial(id, partialBook);
        if (updatedBook) {
            res.json(updatedBook);
            return updatedBook;
        } else {
            res.status(404).json({ message: 'Book not found' });
            throw new Error('Book not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
};

/**
 * Deletes a book from the collection and sends a 204 status code as a response.
 * @param req The Express Request object containing the book ID in the URL params.
 * @param res The Express Response object used to send the status code as a response.
 * @returns A Promise<void> that resolves when the operation is complete.
 */
export const deleteBookController = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    try {
        await deleteBook(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
};
