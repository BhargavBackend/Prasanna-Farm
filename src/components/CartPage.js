import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ onPlaceOrder }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Assuming onPlaceOrder checks authentication
    onPlaceOrder(navigate); // Pass the navigate function to handlePlaceOrder
  };

  return (
    <div>
      {/* Cart content here */}
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CartPage;
