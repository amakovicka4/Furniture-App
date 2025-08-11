import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: '',
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const payload = {
      items: cartItems,
      user: formData,
      total,
    };

    try {
      const res = await fetch('http://localhost:5160/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Order placed successfully!');
        navigate('/');
      } else {
        alert('Failed to place order.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="checkout-section checkout-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">Total: ${total.toFixed(2)}</div>
          </div>

          <div className="checkout-section">
            <h3>Shipping & Payment</h3>
            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInput}
              />
              <input
                name="address"
                type="text"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleInput}
              />
              <input
                name="paymentMethod"
                type="text"
                placeholder="Card / Payment Method"
                value={formData.paymentMethod}
                onChange={handleInput}
              />
              <button type="button" className="checkout-btn" onClick={handleCheckout}>
                Place Order
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
