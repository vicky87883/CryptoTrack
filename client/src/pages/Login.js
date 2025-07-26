// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import backgroundImg from '../assets/img/background.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';

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
    <div className="auth-container d-flex align-items-center justify-content-center vh-100" style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="auth-box dark-glass p-4 rounded" style={{ backgroundColor: '#000000' }}>
        <h2 className="text" style={{ color: 'rgb(255, 151, 29)' }}>Sign In</h2>
        <p className="text-white text-center">Login to track your favorite cryptocurrencies.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text bg-dark" style={{ color: 'rgb(255, 151, 29)', borderColor: 'rgb(255, 151, 29)' }}><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: '#020716', color: '#b3b3c0', borderColor: 'rgb(255, 151, 29)' }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text bg-dark" style={{ color: 'rgb(255, 151, 29)', borderColor: 'rgb(255, 151, 29)' }}><FaLock /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: '#020716', color: '#b3b3c0', borderColor: 'rgb(255, 151, 29)' }}
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="d-flex justify-content-between align-items-center text-white">
            <div>
              <input type="checkbox" /> Remember Me?
            </div>
            <span style={{ color: 'rgb(255, 151, 29)' }}>Forgot Password?</span>
          </div>
          <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: 'rgb(255, 151, 29)', color: '#fff' }}>Sign In</button>
        </form>
        <p className="text-white text-center mt-3">or sign in with others account?</p>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <i className="bi bi-google text-white fs-4"></i>
          <i className="bi bi-facebook text-white fs-4"></i>
          <i className="bi bi-instagram text-white fs-4"></i>
          <i className="bi bi-linkedin text-white fs-4"></i>
        </div>
        <p className="text-white text-center">Don't have an account? <Link to="/register" style={{ color: 'rgb(255, 151, 29)' }}>Click here to sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
