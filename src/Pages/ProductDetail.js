import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';



const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5160/products/id/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image || "/placeholder.jpg"} alt={product.name} />
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>

        <div className="specs">
          <p><strong>Manufacturer:</strong> {product.manInfo}</p>
          <p><strong>Dimensions:</strong> {product.dimensions}</p>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>Category:</strong> {product.category.name}</p>
        </div>

        <button className='add-to-cart'onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
