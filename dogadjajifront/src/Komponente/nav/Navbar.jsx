 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.removeItem('token');
      
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar bootsnav">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            Dogadjaji <span>Beograd</span>
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Početna</Link>
          </li>
          <li className="nav-item">
            <Link to="/seasonTickets" className="nav-link">Sezonske karte</Link>
          </li>
          {user ? (
             <>
              <li className="nav-item">
                <Link to="/dogadjaji" className="nav-link">Dogadjaji</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
