import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOnMainPage, setIsOnMainPage] = useState(false);

  useEffect(() => {
    if (location.pathname === '/main') {
      setIsOnMainPage(true);
    } else {
      setIsOnMainPage(false);
    }
  }, [location.pathname]);

  const handleMainSignupClick = () => {
    if (isOnMainPage) {
      navigate('/signup');
    } else {
      navigate('/main');
    }
  };

  return (
    <nav className="navbar">
      <h1>CRM-Application</h1>
      <div className="nav-buttons">
        <button onClick={handleMainSignupClick}>
          {isOnMainPage ? 'Signup Page' : 'Main Page'}
        </button>
        <button onClick={() => navigate('/audience')}>Create Audience</button>
        <button onClick={() => navigate('/campaign')}>Campaign Page</button> {/* New button */}
      </div>
    </nav>
  );
};

export default Navbar;
