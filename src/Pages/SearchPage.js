import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5160/Product/products/search?query=${query}`, {
            withCredentials: true,
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="decor-page">
      <h2>Search Results for "{query}"</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="decor-grid">
          {products.map((product) => (
            <div key={product.id} className="decor-card">
              <Link to={`/product/${product.id}`} className="product-card">
                <img src={product.image || "/placeholder.jpg"} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price?.toFixed(2)}</p>
              </Link>
              <button className="button" onClick={() => addToCart(product)}>
                <FaShoppingCart />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;