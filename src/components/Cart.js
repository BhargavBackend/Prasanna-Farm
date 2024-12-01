import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, setCartItems, toggleCart }) => {
  // Update quantity of items
  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-popup">
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={toggleCart} className="close-cart-button">×</button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="remove-item-button">Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h4>Total: ₹{totalPrice}</h4>
            <button onClick={() => alert('Proceed to Checkout')} className="checkout-button">Checkout</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
