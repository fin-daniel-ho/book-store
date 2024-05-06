import React from 'react';
import { Book } from '../../types/book';

interface BookListProps {
    books: Book[];
    onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onSelectBook }) => {
    return (
        <div>
            <h2>Book List</h2>
            <div className="list-container-content">
                <ul>
                    {books.map((book) => (
                        <li key={book.id} onClick={() => onSelectBook(book)}>
                            {book.title} - {book.author}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BookList;
