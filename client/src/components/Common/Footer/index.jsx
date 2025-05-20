import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './footerstyle.css';
import logo from '../../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="footer" id="contact-us">
      <div className="footer-container">
      <div className="logo-foot-box">
        <div className="logo-footer-placeholder">
           <img src={logo} alt="" width={100} height={100} />

        </div>
        <div className="contact-info">
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="icon" />
            <span>03212332364</span>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <span>fypa742@gmail.com</span>
          </div>
        </div>
      </div>

        
        <div className="footer-links">
          <div className="links-group">
            <h4>Help</h4>
            <ul>
              <li>Help Center</li>
              <li>Product Recalls</li>
              <li>My Account</li>
              <li>Affiliate Program</li>
              <li>Advertise With Us</li>
            </ul>
          </div>
          <div className="links-group">
            <h4>Shipping & Delivery</h4>
            <ul>
              <li>Track Orders</li>
              <li>Shipping FAQs</li>
              <li>Pickup</li>
              <li>Same Day Delivery</li>
              <li>Return & Refunds</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © FYP 2024.</p>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebookF} className="icon" />
          <FontAwesomeIcon icon={faTwitter} className="icon" />
          <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <FontAwesomeIcon icon={faYoutube} className="icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
