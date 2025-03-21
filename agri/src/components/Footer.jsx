import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import AgriLink_Logo from '../assets/AgriLink_Logo.png'; 
import IG1 from '../assets/IG1.jpg';
import FB from '../assets/FB.jpg';
import X from '../assets/X.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <Link to="/" className="footer-logo">
            <img src={AgriLink_Logo} alt="AgriLink Logo" />
            <span>AgriLink</span>
          </Link>
          <p>Creating a unified agricultural platform that connects Rwandan farmers with markets and information</p>
          <div className="social-icons">
          <img src={FB} className="social-icon"/>
          <img src={X} className="social-icon"/>
          <img src={IG1} className="social-icon"/>
             
            
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-link-group">
            <h3>Navigation</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className="footer-link-group">
            <h3>Services</h3>
            <Link to="/services#market">Market Integration</Link>
            <Link to="/services#data">Data Analytics</Link>
            <Link to="/services#training">Farmer Training</Link>
            <Link to="/services#community">Community Building</Link>
          </div>
          
          <div className="footer-link-group">
            <h3>Legal</h3>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AgriLink Rwanda. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;