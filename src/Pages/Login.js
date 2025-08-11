import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { LoginContext } from '../context/LoginContext';
import logo from '../assests/images/logo1.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(username, password);
    if (response) {
      navigate('/');
    } else {
      alert('Unable to Login. Please Try Again');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container" style={{ textAlign: 'left', marginTop: '-500px', marginBottom: '0px', marginLeft:'-500px',marginRight:'400px' }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '100px' }} />
        </Link>
      </div>

      <div className="login-form">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="register-prompt">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;