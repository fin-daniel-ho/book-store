import fs from 'fs';
import path from 'path';
import { Book } from '../models/book';

const dbPath = path.join(__dirname, '../../db.json');

export const loadBooks = (): Book[] => {
    try {
        const dbData = fs.readFileSync(dbPath, 'utf-8');
        const jsonData = JSON.parse(dbData);
        if (Array.isArray(jsonData.books)) {
            return jsonData.books;
        }
    } catch (error) {
        console.error('Error loading books data:', error);
    }
    return [];
};

export const writeBooks = (books: Book[]): void => {
    try {
        const data = JSON.stringify({ books }, null, 2);
        fs.writeFileSync(dbPath, data);
    } catch (error) {
        console.error('Error writing books data:', error);
    }
};
