const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [String],
  cover: String,
  description: String,
  publishedDate: String,
  categories: [String],
  pageCount: Number,
  language: String,
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
