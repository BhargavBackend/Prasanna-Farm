import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';
import './HomePage.css';
import logo from './images/Screenshot 2024-10-31 160528.png'



function HomePage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); // New state for category filter

  useEffect(() => {
    // Fetch products from backend when component mounts
    axios.get('http://localhost:8080/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => !categoryFilter || product.category === categoryFilter);

  return (
    <div>
      <header>
        <h1>Welcome to Prasanna Farms</h1>
        <img src={logo} alt="Logo" className="logo" />

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Shop Links */}
        <nav>
          <button onClick={() => setCategoryFilter('vegetable')}>Vegetables</button>
          <button onClick={() => setCategoryFilter('fruit')}>Fruits</button>
        </nav>
      </header>

      <main>
        {/* Product List */}
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">Price: ₹ {product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Cart Popup */}
        {isCartOpen && (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            toggleCart={toggleCart}
          />
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Logo" className="logo" />
            <p>Prasanna is a project of passion initiated by three like-minded individuals, united by their love for food.</p>
          </div>
          <div className="footer-shop">
            <h3>Shop</h3>
            <ul>
              <li><button onClick={() => setCategoryFilter('vegetable')}>Vegetables</button></li>
              <li><button onClick={() => setCategoryFilter('fruit')}>Fruits</button></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="./About">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/shipping-returns">Shipping & Returns</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-service">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
