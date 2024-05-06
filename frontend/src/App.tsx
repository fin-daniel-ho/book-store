import React, { useState, useEffect, useRef } from 'react';
import BookList from './components/Books/BookList';
import BookForm from './components/Books/BookForm';
import { Book } from './types/book';
import { getAllBooks } from './services/api';
import './App.css';

const App: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllBooks()
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const handleSelectBook = (book: Book) => {
        setSelectedBook(book);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setSelectedBook(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="app-header">
                <h1>Book Store Management</h1>
            </div>
            <div ref={formRef}>
                <div className="app-container">
                    <div className="form-container">
                        <BookForm selectedBook={selectedBook} />
                    </div>
                    <div className="list-container">
                        <BookList books={books} onSelectBook={handleSelectBook} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
