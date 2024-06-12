// App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Navbar from './components/Navbar';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import PrefinalPage from './pages/PrefinalPage';
import AudienceCreation from './components/AudienceCreation'; // Import AudienceCreation component
import CampaignPage from './components/CampaignPage'; // Import CampaignPage component
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route
            exact
            path="/"
            element={
              user ? (
                <div>
                  <Home user={user} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <div>
                  <Signup />
                </div>
              )
            }
          />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/order" element={<OrderForm />} />
          <Route
            path="/prefinal"
            element={user ? <PrefinalPage /> : <Navigate to="/login" />}
          />
          <Route path="/audience" element={<AudienceCreation />} /> {/* New route */}
          <Route path="/campaign" element={<CampaignPage />} /> {/* New route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
