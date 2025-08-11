// src/Pages/Office.js

import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Office = () => {
  const { addToCart } = useContext(CartContext);
  const [officeProducts, setOfficeProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5160/products/office')
      .then((res) => res.json())
      .then((data) => setOfficeProducts(data))
      .catch((err) => console.error('Failed to fetch office products:', err));
  }, []);

  return (
    <div className="decor-page">
      <h2>Office Collection</h2>
      <div className="decor-grid">
        {officeProducts.map((product) => (
          <div key={product.id} className="decor-card">
            <Link to={`/product/${product.id}`} className="product-card">
              <img src={product.image || "/placeholder.jpg"} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price?.toFixed(2)}</p>
            </Link>
            <button className="buttom" onClick={() => addToCart(product)}>
              <FaShoppingCart />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Office;
