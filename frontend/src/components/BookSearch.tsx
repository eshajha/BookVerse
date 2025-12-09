import React, { useState } from 'react';

interface Book {
  googleId: string;
  title: string;
  authors: string[];
  cover: string;
  description: string;
}

interface Props {
  onAdd: (book: Book) => void;
}

const BookSearch: React.FC<Props> = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for books..."
          style={{
            flex: 1,
            padding: '10px 16px',
            fontSize: '15px',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
          }}
        />
        <button 
          type="submit" 
          style={{
            backgroundColor: '#5e3a27',
            borderRadius: '10px',
            color: 'white',
            padding: '10px 18px',
            border: 'none',
            cursor: 'pointer',
            transition: '0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9a6e4c')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5e3a27')}
        >
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(book => (
          <div key={book.googleId} className="bg-white p-2 rounded shadow flex flex-col items-center">
            <img src={book.cover} alt={book.title} className="w-24 h-36 object-cover mb-2" />
            <div className="font-semibold text-center mb-1">{book.title}</div>
            <div className="text-xs text-gray-600 mb-2">{book.authors?.join(', ')}</div>
            <button onClick={() => onAdd(book)} className="bg-green-600 text-white px-2 py-1 rounded text-sm">Add to Shelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
