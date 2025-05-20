import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { signup } from '../../utility/auth';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../../assets/logo.jpeg';

const Index = () => {
    const navigate = useNavigate();
    const captchaRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        captchaChecked: false,
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSignup = async () => {
        const { fullName, email, password, captchaChecked } = formData;

        const token = captchaRef.current.getValue();

        if (!token) {
            toast.error('Please verify the reCAPTCHA!', { position: "top-center" });
            return;
        }

        captchaRef.current.reset();

        const data = {
            fullName,
            email,
            password,
            captchaToken: token
        };

        try {
            const response = await signup(data);
            console.log(response);
            if (response.success) {
                toast.success("Signed up!!", {
                    position: "top-center"
                });

                // Introducing a delay before redirection, to be able to see the toastify message
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        }
        catch (error) {
            toast.error(error.message, {
                position: "top-center"
            });
        }
    };

    return (
        <>
            <div className="signup-container poppins">
                <div className="signup-box">
                    <div className="avatar-placeholder">
                         <img src={logo} alt="" width={100} height={100} />

                    </div>
                    <form
                        className="signup-form"
                        onSubmit={(e) => e.preventDefault()} // Prevent default form submission
                    >
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {/* captcha  */}
                        <div className="captcha">
                            <ReCAPTCHA
                                className='Captcha'
                                sitekey={import.meta.env.VITE_REACT_CAPTCHA_SITE_KEY}
                                ref={captchaRef}
                            />
                        </div>

                        <button
                            type="button" // Change button type to 'button' to avoid form submission
                            className="create-account-btn"
                            onClick={handleSignup}
                        >
                            Create Account
                        </button>

                        <div className="signin-option">
                            <span>Already have an account? &nbsp;</span>
                            <a href="/login" className="sign-in-link">Sign in</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Index;
