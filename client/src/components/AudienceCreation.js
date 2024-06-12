
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AudienceCreation.css';

const AudienceCreation = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filters, setFilters] = useState({
    totalSpendsGreaterThan: { active: false, value: 10000 },
    maxVisits: { active: false, value: 3 },
    minVisits: { active: false, value: 1 },
    lastVisitDate: { active: false, value: 3 },
  });
  const [audienceSize, setAudienceSize] = useState(null);
  const [savedAudiences, setSavedAudiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/customers');
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const applyFilters = () => {
    let filtered = customers.filter(customer => {
      let isValid = true;

      if (filters.totalSpendsGreaterThan.active && customer.total_spends <= filters.totalSpendsGreaterThan.value) {
        isValid = false;
      }
      if (filters.maxVisits.active && customer.number_of_visits > filters.maxVisits.value) {
        isValid = false;
      }
      if (filters.minVisits.active && customer.number_of_visits < filters.minVisits.value) {
        isValid = false;
      }
      if (filters.lastVisitDate.active && new Date(customer.last_visit_date) >= new Date(new Date().setMonth(new Date().getMonth() - filters.lastVisitDate.value))) {
        isValid = false;
      }

      return isValid;
    });

    setFilteredCustomers(filtered);
    setAudienceSize(filtered.length);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: {
        ...prevFilters[name],
        [type === 'checkbox' ? 'active' : 'value']: type === 'checkbox' ? checked : value
      }
    }));
  };

  const saveAudience = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/customers/save-audience', {
        filters,
        audience: filteredCustomers,
        audienceSize,
      });
      console.log(response.data); // Optional: Log success message
      setSavedAudiences([...savedAudiences, { ...response.data, filters, audience: filteredCustomers, audienceSize }]);
      // navigate('/past-campaigns'); // Navigate to past campaigns page upon saving audience
    } catch (error) {
      console.error('Error saving audience:', error);
    }
  };

  return (
    <div className="audience-creation-container">
      <h1>Audience Creation</h1>
      <div className="audience-creation-form">
        <label>
          <input
            type="checkbox"
            name="totalSpendsGreaterThan"
            checked={filters.totalSpendsGreaterThan.active}
            onChange={handleFilterChange}
          />
          Customers with total spends greater than INR
          <input
            type="number"
            name="totalSpendsGreaterThan"
            value={filters.totalSpendsGreaterThan.value}
            onChange={handleFilterChange}
            disabled={!filters.totalSpendsGreaterThan.active}
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="maxVisits"
            checked={filters.maxVisits.active}
            onChange={handleFilterChange}
          />
          Customers with max number of visits are
          <input
            type="number"
            name="maxVisits"
            value={filters.maxVisits.value}
            onChange={handleFilterChange}
            disabled={!filters.maxVisits.active}
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="minVisits"
            checked={filters.minVisits.active}
            onChange={handleFilterChange}
          />
          Customers with minimum number of visits are
          <input
            type="number"
            name="minVisits"
            value={filters.minVisits.value}
            onChange={handleFilterChange}
            disabled={!filters.minVisits.active}
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="lastVisitDate"
            checked={filters.lastVisitDate.active}
            onChange={handleFilterChange}
          />
          Customers not visited in last
          <input
            type="number"
            name="lastVisitDate"
            value={filters.lastVisitDate.value}
            onChange={handleFilterChange}
            disabled={!filters.lastVisitDate.active}
          />
          months
        </label>
        <br />
        <button onClick={applyFilters}>Check Audience</button>
        <button onClick={saveAudience}>Save Audience</button>
      </div>
      {audienceSize !== null && (
        <div className="audience-size">
          <h2>Total Audience Size: {audienceSize}</h2>
        </div>
      )}
      <div className="audience-creation-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Spends</th>
              <th>Number of Visits</th>
              <th>Last Visit Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.total_spends}</td>
                <td>{customer.number_of_visits}</td>
                <td>{customer.last_visit_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="saved-audience-container">
        {savedAudiences.map((savedAudience, index) => (
          <div key={index}>
            <h3>Saved Audience {index + 1}</h3>
            <p>Total Audience Size: {savedAudience.audienceSize}</p>
            <p>Filters:</p>
            <ul>
              {Object.entries(savedAudience.filters).map(([key, filter]) => (
                filter.active && <li key={key}>{key}: {filter.value}</li>
              ))}
            </ul>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Spends</th>
                  <th>Number of Visits</th>
                  <th>Last Visit Date</th>
                </tr>
              </thead>
              <tbody>
                {savedAudience.audience.map(customer => (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.total_spends}</td>
                    <td>{customer.number_of_visits}</td>
                    <td>{customer.last_visit_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceCreation;
