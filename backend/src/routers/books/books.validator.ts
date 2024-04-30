import { Book } from '../../types/book';

/**
 * Validates a book object to ensure it meets the required criteria.
 * @param book The book object to validate.
 * @returns A string containing an error message if the book object is invalid, or null if it is valid.
 */
export const validateBook = (book: Book): string | null => {
    if (!book.title || !book.author) {
        return 'Title and author are required fields.';
    }
    return null;
};
