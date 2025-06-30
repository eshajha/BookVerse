import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to BookVerse</h1>
        {user ? (
          <>
            <p className="mb-4">Hello, <span className="font-semibold">{user.name}</span>!</p>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <p className="mb-4">Please <a href="/login" className="text-blue-600 hover:underline">Login</a> or <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
