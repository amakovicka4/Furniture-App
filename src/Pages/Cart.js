import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const shippingCost = 10.0;
  const total = (subtotal + shippingCost).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty">
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Shopping Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image || '/placeholder.png'}
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>${item.price?.toFixed(2)}</p>
              <div className="quantity-controls">
                <label htmlFor={`qty-${item.id}`}>Qty:</label>
                <button onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity">−</button>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  value={item.quantity}
                  readOnly
                />
                <button onClick={() => increaseQuantity(item.id)} aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>${total}</span>
        </div>
        <button
          className="checkout-btn"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;