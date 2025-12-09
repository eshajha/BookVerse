import React, { useState } from 'react';
import BookDetailsModal from './BookDetailsModal';

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

interface Props {
  books: UserBook[];
  onBookClick?: (userBook: UserBook) => void;
}

const Bookshelf: React.FC<Props> = ({ books, onBookClick }) => {
  const [selected, setSelected] = useState<UserBook | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBookClick = (userBook: UserBook) => {
    setSelected(userBook);
    setModalOpen(true);
    onBookClick?.(userBook);
  };

  if (!books.length) return <div className="text-gray-500">No books on this shelf.</div>;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map(userBook => (
          <div
            key={userBook._id}
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(5px)',
              borderRadius: '14px',
              padding: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: '0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
            onClick={() => handleBookClick(userBook)}
          >
            <img src={userBook.book.cover} alt={userBook.book.title} className="w-24 h-36 object-cover mb-2 rounded" />
            <div className="font-semibold text-center mb-1 text-sm">{userBook.book.title}</div>
            <div className="text-xs text-gray-600 mb-2">{userBook.book.authors?.join(', ')}</div>
            <div className="text-xs" style={{ color: '#5e3a27' }}>Shelf: {userBook.shelf}</div>
          </div>
        ))}
      </div>
      {selected && (
        <BookDetailsModal
          userBook={selected}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={() => {}}
        />
      )}
    </>
  );
};

export default Bookshelf;
