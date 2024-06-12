
// CustomerForm.js
import React, { useState } from 'react';
import './Customer.css'; // Import CSS file

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfVisits, setNumberOfVisits] = useState('');
  const [lastVisitDate, setLastVisitDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          number_of_visits: parseInt(numberOfVisits),
          last_visit_date: new Date(lastVisitDate),
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('New customer:', data);
      setName('');
      setEmail('');
      setNumberOfVisits('');
      setLastVisitDate('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="customer-form">
        <h2>Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Number of Visits:
            <input type="number" value={numberOfVisits} onChange={(e) => setNumberOfVisits(e.target.value)} />
          </label>
          <label>
            Last Visit Date:
            <input type="date" value={lastVisitDate} onChange={(e) => setLastVisitDate(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;

