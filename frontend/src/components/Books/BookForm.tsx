import React, { useState, useEffect } from 'react';
import { Book } from '../../types/book';
import { addBook, updateBook, deleteBook } from '../../services/api';

interface Props {
    selectedBook?: Book | null;
}

const BookForm: React.FC<Props> = ({ selectedBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
   
    useEffect(() => {
        if (selectedBook) {
            setTitle(selectedBook.title);
            setAuthor(selectedBook.author);
            setDescription(selectedBook.description);
            setIsButtonEnabled(true);
        } else {
            setTitle('');
            setAuthor('');
            setDescription('');
            setIsButtonEnabled(false);
        }
    }, [selectedBook]);

    const handleAddBook = async () => {
        if (!title || !author) {
            alert('Title and author are required fields.');
            return;
        }

        const newBook: Omit<Book, 'id'> = { title, author, description };
        await addBook(newBook)
            .then(() => { clearForm(); window.location.reload() })
            .catch((error) => console.error('Error saving book:', error));
    };


    const handleUpdateBook = async () => {
        if (!selectedBook) return;
        const updatedBook: Book = {
            ...selectedBook,
            title,
            author,
            description,
        };
        await updateBook(selectedBook.id, updatedBook)
            .then(() => { clearForm(); window.location.reload() })
            .catch((error) => console.error('Error updating book:', error));
    };

    const handleDeleteBook = async () => {
        if (!selectedBook) return;
        await deleteBook(selectedBook.id)
            .then(() => { clearForm(); window.location.reload() })
            .catch((error) => console.error('Error deleting book:', error));
    };

    const clearForm = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setIsButtonEnabled(false);
    };

    return (
        <div>
            <h2>Add/Update Book</h2>
            <form>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='author'>Author</label>
                    <input
                        type='text'
                        id='author'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        className='textarea-description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </form>
            <div className='button-container'>
                <button type='button' onClick={handleAddBook} disabled={isButtonEnabled}>Save New</button>
                <button type='button' onClick={handleUpdateBook} disabled={!isButtonEnabled}>Save</button>
                <button type='button' onClick={handleDeleteBook} disabled={!isButtonEnabled}>Delete</button>
            </div>
        </div>
    );
};

export default BookForm;
