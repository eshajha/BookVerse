const express = require('express');
const axios = require('axios');
const Book = require('../models/Book');
const UserBook = require('../models/UserBook');
const auth = require('../middleware/auth');

const router = express.Router();

// Search Google Books API
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Query required' });
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: { q, maxResults: 20 },
    });
    const books = response.data.items?.map(item => ({
      googleId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      cover: item.volumeInfo.imageLinks?.thumbnail || '',
      description: item.volumeInfo.description || '',
      publishedDate: item.volumeInfo.publishedDate || '',
      categories: item.volumeInfo.categories || [],
      pageCount: item.volumeInfo.pageCount || 0,
      language: item.volumeInfo.language || '',
    })) || [];
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Google Books API error' });
  }
});

// Add book to user's shelf
router.post('/add', auth, async (req, res) => {
  const { googleId, shelf, rating, review } = req.body;
  try {
    // Find or create the book in the database
    let book = await Book.findOne({ googleId });
    if (!book) {
      // Optionally, fetch book details from Google Books API here
      book = new Book({ googleId, ...req.body });
      await book.save();
    }
    // Create or update UserBook
    let userBook = await UserBook.findOne({ user: req.user.userId, book: book._id });
    if (!userBook) {
      userBook = new UserBook({ user: req.user.userId, book: book._id, shelf, rating, review });
    } else {
      userBook.shelf = shelf;
      userBook.rating = rating;
      userBook.review = review;
    }
    await userBook.save();
    res.status(201).json(userBook);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book to shelf' });
  }
});

// Get user's books (optionally filtered by shelf)
router.get('/my', auth, async (req, res) => {
  const { shelf } = req.query;
  try {
    const filter = { user: req.user.userId };
    if (shelf) filter.shelf = shelf;
    const userBooks = await UserBook.find(filter).populate('book');
    res.json(userBooks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user books' });
  }
});

// Update user book (move shelf, update rating/review)
router.put('/my/:id', auth, async (req, res) => {
  try {
    const userBook = await UserBook.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!userBook) return res.status(404).json({ message: 'UserBook not found' });
    res.json(userBook);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user book' });
  }
});

// Remove book from user's library
router.delete('/my/:id', auth, async (req, res) => {
  try {
    const userBook = await UserBook.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!userBook) return res.status(404).json({ message: 'UserBook not found' });
    res.json({ message: 'Book removed from library' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing book' });
  }
});

// Get all reviews and average rating for a book
router.get('/:googleId/reviews', async (req, res) => {
  try {
    const book = await Book.findOne({ googleId: req.params.googleId });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const userBooks = await UserBook.find({ book: book._id, review: { $ne: null } }).populate('user', 'name');
    const reviews = userBooks.map(ub => ({
      user: ub.user.name,
      rating: ub.rating,
      review: ub.review,
      updatedAt: ub.updatedAt,
    }));
    const ratings = userBooks.filter(ub => ub.rating).map(ub => ub.rating);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : null;
    res.json({ reviews, avgRating });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

module.exports = router;
