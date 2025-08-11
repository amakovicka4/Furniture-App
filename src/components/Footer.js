// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assests/images/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
        <img 
            src={logo} 
            alt="Furniture Shop Logo" 
            className="navbar-logo"
            style={{ 
              height: '100px',
              padding: '1px 10px',
              paddingLeft: '0'
            }}
          />
        </div>

        <div className="footer-column">
          <h4>LINKS</h4>
          <ul>
            <li><Link to="/story">Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>CATEGORIES</h4>
          <ul>
            <li><Link to="/bedroom">Bedroom (6)</Link></li>
            <li><Link to="/decor">Decor (9)</Link></li>
            <li><Link to="/living-room">Living Room (6)</Link></li>
            <li><Link to="/office">Office (11)</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>SUBSCRIBE</h4>
          <input type="email" placeholder="Your email address..." />
          <button className="subscribe-btn">SUBSCRIBE</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 402Furn | Powered by 402Furn</p>
        <div className="social-icons">
          <i className="fab fa-facebook-f" />
          <i className="fab fa-yelp" />
          <i className="fab fa-youtube" />
          <i className="fab fa-instagram" />
          <i className="fab fa-twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
