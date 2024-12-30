import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="site-container">
        <ul className="footer-links">
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/terms-of-use">Terms of Use</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/cookies">Cookies</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/faq">FAQs</Link></li>
        </ul>
        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Facebook style={{ fontSize: 30 }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Instagram style={{ fontSize: 30 }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <YouTube style={{ fontSize: 30 }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <LinkedIn style={{ fontSize: 30 }} />
          </a>
        </div>
        <p className="footer-copyright">
          © SimserviceHub - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
