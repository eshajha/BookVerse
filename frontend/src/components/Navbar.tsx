import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between mb-6">
      <div className="font-bold text-xl">
        <Link to="/dashboard">BookVerse</Link>
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
