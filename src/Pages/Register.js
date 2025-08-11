import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assests/images/logo1.png';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm password check
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5160/register', {
        username: formData.username,
        password: formData.password
      });

      if (response.data.success) {
        console.log('Registration successful:', response.data);
        navigate('/login');
      } else {
        alert('Unable to register. Please try again.');
      }
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }

    console.log('Registration submitted:', formData);
  };

  return (
    <div className="register-container">
      <div
        className="logo-container"
        style={{
          textAlign: 'left',
          marginTop: '-650px',
          marginBottom: '0px',
          marginLeft: '-500px',
          marginRight: '400px'
        }}
      >
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '100px' }} />
        </Link>
      </div>

      <div className="register-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="login-prompt">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;