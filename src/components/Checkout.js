import React, { useState } from 'react';

const Checkout = ({ cartItems, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: 'India',
    state: 'Telangana',
    district: '',
    street: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data and process payment logic
    console.log('Order submitted:', formData, cartItems);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} readOnly />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={formData.state} readOnly />
        </div>
        <div>
  <label>District:</label>
  <select name="district" value={formData.district} onChange={handleChange} required>
    <option value="">Select District</option> {/* Default option */}
    <option value="Hyderabad">Hyderabad</option>
    <option value="Rangareddy">Rangareddy</option>
    <option value="Warangal">Warangal</option>
    <option value="Khammam">Khammam</option>
    <option value="Mancherial">Medak</option>
    {/* Add more district options as needed */}
  </select>
</div>

        <div>
          <label>Street:</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </div>

        <h3>Payment</h3>
        <div>
          <label>Total Price: ₹{totalAmount}</label>
        </div>
        <div>
          <label>Payment Method:</label>
          <select required>
            <option value="netbanking">Net Banking</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
