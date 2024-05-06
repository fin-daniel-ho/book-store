import axios from 'axios';
import { Book } from '../types/book';

const BASE_URL = process.env.REACT_APP_BACKEND_HOST;

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await api.get('/api/books');
  return response.data;
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await api.get(`/api/books/${id}`);
  return response.data;
};

export const addBook = async (newBook: Omit<Book, 'id'>): Promise<Book> => {
  const response = await api.post('/api/books', newBook);
  return response.data;
};

export const updateBook = async (id: number, updatedBook: Book): Promise<Book> => {
  const response = await api.put(`/api/books/${id}`, updatedBook);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/api/books/${id}`);
};
