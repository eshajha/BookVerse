const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  shelf: { type: String, enum: ['reading', 'completed', 'want-to-read'], default: 'want-to-read' },
  rating: { type: Number, min: 1, max: 5 },
  review: String,
}, { timestamps: true });

module.exports = mongoose.model('UserBook', userBookSchema);
