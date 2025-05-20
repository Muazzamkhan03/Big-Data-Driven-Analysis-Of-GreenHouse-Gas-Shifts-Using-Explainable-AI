import React from 'react';
import './navstyle.css';
import logo from '../../../assets/logo.jpeg';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
     <Link to="/home" style={{ textDecoration: "none" }}>
  <div className="logo-box">
    <div className="logo-placeholder">
      <img src={logo} alt="Logo" width={60} height={60} />
    </div>
  </div>
</Link>
      <div className="menu">
        <a href="/home#features" className="menu-item">
          <i className="fas fa-wrench icon"></i> Features
        </a>
        <a href="/faqs" className="menu-item">
          <i className="fas fa-cogs icon"></i> FAQs
        </a>
        <a href="/home#about" className="menu-item">
          <i className="fas fa-list icon"></i> About
        </a>
        {/* <a href="#contact-us" className="menu-item">
          <i className="fas fa-phone icon"></i> Contact Us
        </a> */}
      </div>
      <div className="dashboard-btn">
        <a href="/dashboard">
          <i className="fas fa-chart-line dashboard-icon"></i> Dashboard
        </a>
      </div>
    </div>
  );
};

export default NavBar;
