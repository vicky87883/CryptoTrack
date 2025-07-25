import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center vh-100">
      <div className="auth-box glass p-4 rounded">
        <h2 className="text-white mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-warning w-100">Login</button>
        </form>
        <p className="text-white mt-3">Don't have an account? <Link to="/register" className="text-info">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;