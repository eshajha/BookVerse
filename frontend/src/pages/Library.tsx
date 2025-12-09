import React, { useState, useEffect } from 'react';
import BookSearch from '../components/BookSearch';
import Bookshelf from '../components/Bookshelf';
import { useAuth } from '../contexts/AuthContext';
import BookDetailsModal from '../components/BookDetailsModal';

interface Book {
  googleId: string;
  title: string;
  authors: string[];
  cover: string;
  description: string;
}

interface UserBook {
  _id: string;
  book: Book;
  shelf: string;
  rating?: number;
  review?: string;
}

const shelfLabels: Record<string, string> = {
  'want-to-read': 'Want to Read',
  'reading': 'Currently Reading',
  'completed': 'Read',
};

const Library: React.FC = () => {
  const { user } = useAuth();
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [activeShelf, setActiveShelf] = useState('want-to-read');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState<UserBook | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/books/my?shelf=${activeShelf}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserBooks(data);
    } catch (err) {
      setError('Error loading your books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBooks();
    // eslint-disable-next-line
  }, [user, activeShelf]);

  const handleAddBook = async (book: Book) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...book, shelf: 'want-to-read' }),
      });
      if (!res.ok) throw new Error('Failed to add book');
      fetchBooks();
    } catch (err) {
      setError('Error adding book');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (userBook: UserBook) => {
    setSelectedBook(userBook);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #faf7f2 0%, #e4d4c0 40%, #c1a487 100%)', backgroundAttachment: 'fixed', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: '700', color: '#5e3a27', marginBottom: '1rem', borderBottom: '3px solid #9a6e4c', display: 'inline-block', paddingBottom: '4px' }}>Book Search</h2>
        <BookSearch onAdd={handleAddBook} />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: '700', color: '#5e3a27', marginBottom: '1rem', marginTop: '2rem', borderBottom: '3px solid #9a6e4c', display: 'inline-block', paddingBottom: '4px' }}>My Library</h2>
      <div className="flex gap-2 mb-4">
        {Object.entries(shelfLabels).map(([key, label]) => (
          <button
            key={key}
            style={{
              backgroundColor: activeShelf === key ? '#5e3a27' : '#e0d4c8',
              color: activeShelf === key ? 'white' : '#5e3a27',
              fontWeight: activeShelf === key ? '600' : '400',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 18px',
              cursor: 'pointer',
              transition: '0.3s ease'
            }}
            onClick={() => setActiveShelf(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <Bookshelf books={userBooks} onBookClick={handleBookClick} />
      {selectedBook && (
        <BookDetailsModal
          userBook={selectedBook}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={async (updates) => {
            setLoading(true);
            setError('');
            try {
              const token = localStorage.getItem('token');
              const res = await fetch(`/api/books/my/${selectedBook._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
              });
              if (!res.ok) throw new Error('Failed to update book');
              fetchBooks();
            } catch (err) {
              setError('Error updating book');
            } finally {
              setLoading(false);
            }
          }}
        />
      )}
      </div>
    </div>
  );
};

export default Library;
