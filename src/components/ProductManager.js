import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', description: '', price: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products on load
  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle creating a product
  const handleCreateProduct = () => {
    axios.post('http://localhost:8080/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', category: '', description: '', price: '', imageUrl: '' });
      })
      .catch(error => console.error('Error creating product:', error));
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  // Handle initiating the update form
  const startEditProduct = (product) => {
    setIsEditing(true);
    setEditProduct(product);
  };

  // Handle updating a product
  const handleUpdateProduct = () => {
    axios.put(`http://localhost:8080/products/${editProduct.id}`, editProduct)
      .then(response => {
        setProducts(products.map(product => (product.id === editProduct.id ? response.data : product)));
        setIsEditing(false);
        setEditProduct(null);
      })
      .catch(error => console.error('Error updating product:', error));
  };

  // Handle input changes in the edit form
  const handleEditInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Product Manager</h2>

      {/* Form for adding new product */}
      <form onSubmit={(e) => { e.preventDefault(); handleCreateProduct(); }}>
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
        <input type="text" name="imageUrl" placeholder="Image URL" value={newProduct.imageUrl} onChange={handleInputChange} />
        <button type="submit">Add Product</button>
      </form>

      {/* Display list of products with update and delete options */}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.category} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => startEditProduct(product)}>Update</button>
          </li>
        ))}
      </ul>

      {/* Form for editing a product */}
      {isEditing && editProduct && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
          <input type="text" name="name" placeholder="Product Name" value={editProduct.name} onChange={handleEditInputChange} />
          <input type="text" name="category" placeholder="Category" value={editProduct.category} onChange={handleEditInputChange} />
          <input type="text" name="description" placeholder="Description" value={editProduct.description} onChange={handleEditInputChange} />
          <input type="number" name="price" placeholder="Price" value={editProduct.price} onChange={handleEditInputChange} />
          <input type="text" name="imageUrl" placeholder="Image URL" value={editProduct.imageUrl} onChange={handleEditInputChange} />
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
}

export default ProductManager;
