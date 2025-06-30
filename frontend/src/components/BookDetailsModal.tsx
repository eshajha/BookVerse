import React, { useState } from 'react';

interface Book {
  googleId: string;
  title: string;
  authors: string[];
  cover: string;
  description: string;
  publishedDate?: string;
  categories?: string[];
  pageCount?: number;
  language?: string;
}

interface UserBook {
  _id: string;
  book: Book;
  shelf: string;
  rating?: number;
  review?: string;
}

interface Props {
  userBook: UserBook;
  open: boolean;
  onClose: () => void;
  onSave: (updates: Partial<UserBook>) => void;
}

const shelfOptions = [
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Currently Reading' },
  { value: 'completed', label: 'Read' },
];

const BookDetailsModal: React.FC<Props> = ({ userBook, open, onClose, onSave }) => {
  const [shelf, setShelf] = useState(userBook.shelf);
  const [rating, setRating] = useState(userBook.rating || 0);
  const [review, setReview] = useState(userBook.review || '');
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    await onSave({ shelf, rating, review });
    setSaving(false);
    // onClose(); // Remove this line for real-time update, keep modal open
  };

  // Real-time save on rating or review change
  React.useEffect(() => {
    if (userBook.rating !== rating || userBook.review !== review || userBook.shelf !== shelf) {
      handleSave();
    }
    // eslint-disable-next-line
  }, [rating, review, shelf]);

  const { book } = userBook;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
        <div className="flex flex-col items-center mb-4">
          <img src={book.cover} alt={book.title} className="w-32 h-48 object-cover mb-2" />
          <h2 className="text-xl font-bold mb-1 text-center">{book.title}</h2>
          <div className="text-sm text-gray-600 mb-1">{book.authors?.join(', ')}</div>
          <div className="text-xs text-gray-500 mb-2">{book.publishedDate} {book.categories?.join(', ')}</div>
        </div>
        <div className="mb-2 text-sm text-gray-800">{book.description}</div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Shelf</label>
          <select value={shelf} onChange={e => setShelf(e.target.value)} className="w-full border rounded px-2 py-1">
            {shelfOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Rating</label>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(star => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              >★</span>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Review</label>
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={3}
            placeholder="Write your thoughts..."
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default BookDetailsModal;
