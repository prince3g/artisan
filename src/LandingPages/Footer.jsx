import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
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
          <a href="https://www.facebook.com/share/14kCHuSwvh/" target="_blank" rel="noopener noreferrer">
            <Facebook style={{ fontSize: 30 }} />
          </a>
          <a href="https://www.instagram.com/simulmgt?igsh=MjRrcGw3MWEwYXk1" target="_blank" rel="noopener noreferrer">
            <Instagram style={{ fontSize: 30 }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <YouTube style={{ fontSize: 30 }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <LinkedIn style={{ fontSize: 30 }} />
          </a>
        </div>
        
        <ul className="footer-links ghag-footer">
            <li>Data and privacy policy: <a href="mailto:compliance@simu-l.com">compliance@simu-l.com</a></li>
            <li>General enquiries: <a href="mailto:Info@simservicehub.com">Info@simservicehub.com</a></li>
            <li>Account, Maintenance and IT request: <a href="mailto:Support@simservicehub.com">Support@simservicehub.com</a></li>
            <li>Vetting and Compliance: <a href="mailto:Compliance@simu-l.com">Compliance@simu-l.com</a></li>
            <li>Customer Services: <a href="mailto:Simulcontactcenter@simu-l.com">Simulcontactcenter@simu-l.com</a></li>
            <li>Careers: <a href="mailto:Careers@simu-l.com">Careers@simu-l.com</a></li>
        </ul>


        <p className="footer-copyright">
           {currentYear} Simul Management Solutions Ltd - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
