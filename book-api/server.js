
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Book Collection API! Visit /books to view all books.');
});

let books = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', year: 2018 }
];

// GET: View all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET: View a single book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
});

// POST: Add a new book
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author || year === undefined) {
        return res.status(400).json({
            message: 'Title, author and year are required'
        });
    }

    const newBook = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT: Update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const { title, author, year } = req.body;

    if (!title || !author || year === undefined) {
        return res.status(400).json({
            message: 'Title, author and year are required'
        });
    }

    book.title = title;
    book.author = author;
    book.year = year;

    res.json({
        message: 'Book updated successfully',
        book
    });
});

// DELETE: Remove a book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const deletedBook = books.splice(index, 1)[0];

    res.json({
        message: 'Book deleted successfully',
        book: deletedBook
    });
});

app.listen(PORT, () => {
    console.log(`Book API running at http://localhost:${PORT}`);
});
