// OrderForm.js
import React, { useState, useEffect } from 'react';
import './Customer.css'; // Import CSS file

const OrderForm = () => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerId, setCustomerId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Proceed to create order
      const orderResponse = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, price, quantity, customerId }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();
      console.log('New order:', orderData);

      // Update customer's total spends
      const customerResponse = await fetch(`http://localhost:5001/api/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ total_spends: orderData.total_spends }), // Assuming orderData contains total_spends
      });

      // if (!customerResponse.ok) {
      //   throw new Error('Failed to update customer total spends');
      // }

      setProduct('');
      setPrice(0);
      setQuantity(1);
      setCustomerId('');
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="order-form">
        <h2>Add New Order</h2>
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Product:
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
          </label>
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          </label>
          <label>
            Customer:
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
