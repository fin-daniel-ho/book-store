import { Book } from '../../models/book';
import { validateBook } from '../../routers/books/books.validator';
import { loadBooks, writeBooks } from '../../utils/helpers';

let books: Book[] = loadBooks();

/**
 * Retrieves all books from the collection.
 * @returns An array of Book objects representing all the books in the collection.
 */
export const getAllBooks = (): Book[] => books;

/**
 * Retrieves a book from the collection by its ID.
 * @param id The ID of the book to retrieve.
 * @returns The Book object corresponding to the specified ID, or undefined if no such book exists.
 */
export const getBookById = (id: number): Book | undefined => books.find(book => book.id === id);

/**
 * Adds a new book to the collection.
 * @param title The title of the new book.
 * @param author The author of the new book.
 * @param description The description of the new book.
 * @returns The newly added Book object if successful, or a string containing a validation error message if the input is invalid.
 */
export const addBook = (title: string, author: string, description: string): Book | string => {
    const id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    const newBook = { id, title, author, description };
    const validationError = validateBook(newBook);
    if (validationError) {
        return validationError;
    }
    books.push(newBook);
    writeBooks(books);
    return newBook;
};

/**
 * Updates an existing book in the collection.
 * @param id The ID of the book to update.
 * @param updatedBook The updated Book object.
 * @returns The updated Book object if successful, or undefined if no such book exists.
 */
export const updateBook = (id: number, updatedBook: Book): Book | undefined => {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        writeBooks(books);
        return books[index];
    }
    return undefined;
};

/**
 * Updates specific fields of an existing book in the collection.
 * @param id The ID of the book to update.
 * @param partialBook An object containing the fields to update.
 * @returns The updated Book object if successful, or undefined if no such book exists.
 */
export const updateBookPartial = (id: number, partialBook: Partial<Book>): Book | undefined => {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...partialBook };
        writeBooks(books);
        return books[index];
    }
    return undefined;
};

/**
 * Deletes a book from the collection.
 * @param id The ID of the book to delete.
 */
export const deleteBook = (id: number): void => {
    books = books.filter(book => book.id !== id);
    writeBooks(books);
};
