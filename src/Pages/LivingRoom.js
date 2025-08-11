// src/Pages/LivingRoom.js

import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const LivingRoom = () => {
  const { addToCart } = useContext(CartContext);
  const [livingRoomProducts, setLivingRoomProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5160/products/living-room')
      .then((res) => res.json())
      .then((data) => setLivingRoomProducts(data))
      .catch((err) => console.error('Failed to fetch living room products:', err));
  }, []);

  return (
    <div className="decor-page">
      <h2>Living Room Collection</h2>
      <div className="decor-grid">
        {livingRoomProducts.map((product) => (
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

export default LivingRoom;
