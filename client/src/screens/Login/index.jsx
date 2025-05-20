import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import { toast, ToastContainer } from 'react-toastify';
import { login } from '../../utility/auth';
import logo from '../../assets/logo.jpeg';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location or fallback to "/"
  const from = location.state?.from || '/';

  // Handle login form submission
  const handleSignIn = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;

    const data = {
      email,
      password,
      rememberMe
    };

    try {
      const response = await login(data);

      if (response.success) {
        toast.success("Logged in!!", {
          position: "top-center"
        });

        // Wait a bit to show the toast, then navigate back
        setTimeout(() => {
          navigate(from);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message || "Login failed", {
        position: "top-center"
      });
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      <div className="login-container poppins">
        <div className="login-box">
          <div className="avatar-placeholder">
            <img src={logo} alt="" width={100} height={100} />
          </div>
          <form className="login-form" onSubmit={handleSignIn}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />

            <div className="options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
            </div>

            <button type="submit" className="sign-in-btn">Sign In</button>

            <div className="signup-option">
              <span>Don't have an account? </span>
              <a href="/signup" className="sign-up-link">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
