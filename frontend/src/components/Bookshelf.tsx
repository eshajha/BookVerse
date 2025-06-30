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
            className="bg-white p-2 rounded shadow flex flex-col items-center cursor-pointer"
            onClick={() => handleBookClick(userBook)}
          >
            <img src={userBook.book.cover} alt={userBook.book.title} className="w-24 h-36 object-cover mb-2" />
            <div className="font-semibold text-center mb-1">{userBook.book.title}</div>
            <div className="text-xs text-gray-600 mb-2">{userBook.book.authors?.join(', ')}</div>
            <div className="text-xs text-blue-600">Shelf: {userBook.shelf}</div>
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
