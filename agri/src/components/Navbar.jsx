import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import AgriLink_Logo from '../assets/AgriLink_Logo.png'; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={AgriLink_Logo} alt="AgriLink Logo" />
          <span>AgriLink Rwanda</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
        </div>
        
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        
        <div className="auth-buttons">
          
          <Link to="/login" className="btn-register">LogIn</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;