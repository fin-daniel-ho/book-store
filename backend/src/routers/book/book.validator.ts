import { Book } from '../../models/book';

// Function to validate a book object
export const validateBook = (book: Book): string | null => {
    if (!book.title || !book.author) {
        return 'Title and author are required fields.';
    }
    return null;
};
