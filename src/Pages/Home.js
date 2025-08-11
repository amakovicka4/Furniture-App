// src/Pages/Home.js
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { LoginContext } from '../context/LoginContext';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { user } = useContext(LoginContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    fetch('http://localhost:5160/products/featured')
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data))
      .catch((err) => console.error('Failed to fetch featured products:', err));
  }, []);

  return (
    <div className="home-page">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome {user ? `, ${user}`: 'to the Online Store'}</h1>
          <p>Browse our products and enjoy shopping!</p>
        </div>
      </div>

      <section className="featured-products-section" data-aos="fade-up">
        <h2>Featured Products</h2>
        <div className="underline"></div>
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-card">
              <Link to={`/product/${product.id}`} className="product-card">
                <img src={product.image || "/placeholder.jpg"} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="sale-price">
                  ${(product.price * 0.85).toFixed(2)}{" "}
                  <span className="original-price">${product.price.toFixed(2)}</span>
                </p>
              </Link>
              <button
                className="buttom"
                onClick={() =>
                  addToCart({
                    ...product,
                    price: parseFloat((product.price * 0.85).toFixed(2)),
                  })
                }
              >
                <FaShoppingCart />
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="why-choose-us-section" data-aos="fade-up">
        <h2>Why Choose Us</h2>
        <p className="section-subtitle">Best Products</p>
        <div className="choose-us-grid">
          <div className="choose-box">
            <i className="fa-solid fa-truck-fast"></i>
            <h4>Fast Delivery</h4>
            <p>We prioritize speed and efficiency to ensure your order arrives at your doorstep as quickly as possible, without compromising on care.</p>
          </div>
          <div className="choose-box">
            <i className="fa-solid fa-box"></i>
            <h4>Free Shipping</h4>
            <p>Enjoy free shipping on a wide selection of items. No minimums, no hidden fees — just great products delivered straight to you..</p>
          </div>
          <div className="choose-box">
            <i className="fa-solid fa-shield-halved"></i>
            <h4>Secure Checkout</h4>
            <p>Your privacy and security are our top priorities. All payments are protected by industry-grade encryption and secure protocols.</p>
          </div>
          <div className="choose-box">
            <i className="fa-solid fa-cart-shopping"></i>
            <h4>Easy Returns</h4>
            <p>Changed your mind? No problem. Our hassle-free return policy makes it simple to send items back and shop with confidence.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;