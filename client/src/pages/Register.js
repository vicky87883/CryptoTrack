// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import backgroundImg from '../assets/img/02-page.png';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password
      });
      toast.success('Registration successful');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div style={{ backgroundColor: '#020716' }}>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      <div className="auth-container d-flex align-items-center justify-content-center vh-100" style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="auth-box dark-glass p-4 rounded" style={{ backgroundColor: '#000000' }}>
          <h2 className="text" style={{ color: 'rgb(255, 151, 29)' }}>Sign Up</h2>
          <p className="text-white text-center">Register to access crypto dashboard</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group mb-2">
              <span className="input-group-text bg-dark" style={{ color: 'rgb(255, 151, 29)', borderColor: 'rgb(255, 151, 29)' }}><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ backgroundColor: '#020716', color: '#b3b3c0', borderColor: 'rgb(255, 151, 29)' }}
              />
            </div>
            {errors.username && <div className="text-danger mb-2">{errors.username}</div>}

            <div className="input-group mb-2">
              <span className="input-group-text bg-dark" style={{ color: 'rgb(255, 151, 29)', borderColor: 'rgb(255, 151, 29)' }}><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#020716', color: '#b3b3c0', borderColor: 'rgb(255, 151, 29)' }}
              />
            </div>
            {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

            <div className="input-group mb-2">
              <span className="input-group-text bg-dark" style={{ color: 'rgb(255, 151, 29)', borderColor: 'rgb(255, 151, 29)' }}><FaLock /></span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#020716', color: '#b3b3c0', borderColor: 'rgb(255, 151, 29)' }}
              />
            </div>
            {errors.password && <div className="text-danger mb-2">{errors.password}</div>}

            <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: 'rgb(255, 151, 29)', color: '#fff' }}>Sign Up</button>
          </form>
          <p className="text-white text-center mt-3">Already have an account? <Link to="/login" style={{ color: 'rgb(255, 151, 29)' }}>Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
