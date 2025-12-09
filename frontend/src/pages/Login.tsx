import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary-cream via-secondary-beige to-primary-dark relative">
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/30 to-transparent pointer-events-none" />
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-lg shadow-lg w-80 border-l-8 border-primary font-body relative z-10">
        <h2 className="text-3xl font-heading mb-6 text-center text-primary">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded bg-secondary-cream focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded bg-secondary-cream focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark font-heading">Login</button>
        <div className="mt-4 text-center">
          <a href="/register" className="text-primary hover:underline">Don't have an account? Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
