// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import backgroundImg from '../assets/img/background.png';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/auth/register',
        { username, email, password },
        { withCredentials: true }
      );
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center vh-100" style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="auth-box dark-glass p-4 rounded" style={{ backgroundColor: '#000000' }}>
        <h2 className="text" style={{ color: 'rgb(255, 151, 29)' }}>Sign Up</h2>
        <p className="text-white text-center">Create your CryptoTrack account.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text bg-dark" style={{ color: 'rgb(255, 151, 29)', borderColor: 'rgb(255, 151, 29)' }}><FaUser /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ backgroundColor: '#020716', color: '#b3b3c0', borderColor: 'rgb(255, 151, 29)' }}
            />
          </div>
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
          <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: 'rgb(255, 151, 29)', color: '#fff' }}>Sign Up</button>
        </form>
        <p className="text-white text-center mt-3">or register with others account?</p>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <i className="bi bi-google text-white fs-4"></i>
          <i className="bi bi-facebook text-white fs-4"></i>
          <i className="bi bi-instagram text-white fs-4"></i>
          <i className="bi bi-linkedin text-white fs-4"></i>
        </div>
        <p className="text-white text-center">Already have an account? <Link to="/login" style={{ color: 'rgb(255, 151, 29)' }}>Click here to sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;
