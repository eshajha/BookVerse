import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="text-white px-4 py-3 flex items-center justify-between mb-6" style={{ backgroundColor: '#6a2e2a' }}>
      <div className="flex items-center gap-3" style={{ marginRight: '40px', alignItems: 'center' }}>
        <img 
          src="/newlogo.png" 
          alt="BookVerse Logo" 
          style={{ 
            height: '36px',
            width: 'auto',
            display: 'block'
          }}
        />
        <Link to="/dashboard" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px', color: 'white', textDecoration: 'none', marginTop: '4px', display: 'block', textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 180, 120, 0.4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'white', backgroundImage: 'linear-gradient(135deg, #fff5f0 0%, #ffe4d6 50%, #ffd4b8 100%)', backgroundSize: '200% 200%' }}>
          BookVerse
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/library" className="hover:underline">Library</Link>
        {user ? (
          <>
            <span className="hidden md:inline">Hello, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded ml-2 hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
