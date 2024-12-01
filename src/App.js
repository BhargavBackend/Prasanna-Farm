import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import HomePage from './components/HomePage';
import ProductManager from './components/ProductManager';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

import { useNavigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handlePlaceOrder = (navigate) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      // Use navigate passed from CartPage instead of window.location.href
      navigate('/checkout');
    }
  };

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/manager">Manager</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage onPlaceOrder={handlePlaceOrder} />} />
          <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/manager" element={<ProductManager />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>

      <Modal isOpen={showLoginModal} onRequestClose={() => setShowLoginModal(false)}>
        <h2>Login or Register</h2>
        <button onClick={() => setShowLoginModal(false)}>Close</button>
        <LoginUser onLogin={handleLogin} />
        <RegisterUser />
      </Modal>
    </Router>
  );
}

export default App;
