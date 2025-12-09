import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/books/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setUserBooks(data);
        } else {
          setUserBooks([]);
        }
      } catch (err) {
        setError('Error loading your books');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBooks();
  }, [user]);

  const shelfCounts = (Array.isArray(userBooks) ? userBooks : []).reduce((acc, ub) => {
    acc[ub.shelf] = (acc[ub.shelf] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentBooks = (Array.isArray(userBooks) ? [...userBooks] : []).sort((a, b) => (b as any).updatedAt?.localeCompare((a as any).updatedAt)).slice(0, 5);

  return (
    <div className="relative min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #faf7f2 0%, #e4d4c0 40%, #c1a487 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-[120px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(shelfLabels).map(([key, label]) => (
          <div key={key} className="bg-white p-4 text-center" style={{ borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div className="text-lg font-semibold mb-2">{label}</div>
            <div className="text-2xl font-bold">{shelfCounts[key] || 0}</div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ borderBottom: '3px solid #9a6e4c', display: 'inline-block', paddingBottom: '4px' }}>Recent Books</h2>
      <div className="flex gap-4 overflow-x-auto mb-6">
        {recentBooks.map(ub => (
          <div key={ub._id} className="bg-white p-2 min-w-[120px] flex flex-col items-center" style={{ borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <img src={ub.book.cover} alt={ub.book.title} className="w-16 h-24 object-cover mb-1" />
            <div className="text-xs font-semibold text-center">{ub.book.title}</div>
            <div className="text-xs text-gray-500">{ub.shelf}</div>
          </div>
        ))}
        {!recentBooks.length && <div className="text-gray-500">No recent books.</div>}
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ borderBottom: '3px solid #9a6e4c', display: 'inline-block', paddingBottom: '4px' }}>Quick Stats</h2>
      <div className="bg-white p-4" style={{ borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <div>Total Books: {userBooks.length}</div>
        <div>Books Read: {shelfCounts['completed'] || 0}</div>
        <div>Currently Reading: {shelfCounts['reading'] || 0}</div>
        <div>Want to Read: {shelfCounts['want-to-read'] || 0}</div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
