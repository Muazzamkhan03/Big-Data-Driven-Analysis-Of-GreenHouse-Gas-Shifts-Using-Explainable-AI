import React from 'react';
import './ResetPass.css';
import resetpass from '../../assets/re-enter-pass.png';

const ResetPass = () => {
  return (
    <div className="reset-pass-container poppins">
      <div className="reset-pass-card">
        <img src={resetpass} alt="" />
        <h2 className="reset-pass-title">Re-enter Password?</h2>
        <p className="reset-pass-text">
        Please enter your new password
        </p>
        <form className="reset-pass-form">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />
          {/* <label htmlFor="email" className="reset-pass-label">Email Address</label> */}
          {/* <input type="email" id="email" className="reset-pass-input" placeholder="Enter your email" /> */}
          <button type="submit" className="reset-pass-button">Reset Password</button>
        </form>
        <div className="reset-pass-footer">
          <a href="#"className='reset-pass-option' >← Back to  <span className="reset-pass-back-link">Login</span></a>
          {/* <p>If you don't receive an email within a few minutes, please check your spam folder.</p> */}
        </div>
      </div>
    </div>
  );
}

export default ResetPass;

