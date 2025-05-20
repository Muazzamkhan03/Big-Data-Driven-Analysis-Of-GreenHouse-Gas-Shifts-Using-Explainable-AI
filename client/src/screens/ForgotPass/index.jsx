import React from 'react';
import './ForgotPass.css';
import forgotpass from '../../assets/forgot-pass.png';

const ForgotPass = () => {
  return (
    <div className="forgot-pass-container poppins">
      <div className="forgot-pass-card">
        <img src={forgotpass} alt="" />
        <h2 className="forgot-pass-title">Forgot Password?</h2>
        <p className="forgot-pass-text">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form className="forgot-pass-form">
          <label htmlFor="email" className="forgot-pass-label">Email Address</label>
          <input type="email" id="email" className="forgot-pass-input" placeholder="Enter your email" />
          <button type="submit" className="forgot-pass-button">Send Reset Link</button>
        </form>
        <div className="forgot-pass-footer">
          <a href="/login" className="forgot-pass-back-link">← Back to Login</a>
          <p>If you don't receive an email within a few minutes, please check your spam folder.</p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
