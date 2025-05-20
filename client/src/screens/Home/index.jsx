import React, { useEffect } from "react";
import "./style.css";
import Navbar from "../../components/Common/Navbar";
import Section1 from "../../components/Home/section1";
import Section2 from "../../components/Home/section2";
import Footer from "../../components/Common/Footer";

import Section3 from "../../components/Home/section3";

const index = () => {
    useEffect(() => {
        // Setting the auth object inside of the local storage, as in the future it will be used
        if (!localStorage.getItem('auth')) {
            localStorage.setItem('auth', JSON.stringify({ isLoggedIn: false, name: '', email: '' }));
        }
    }, []);

    return (
        <div className="main-container">
            <div className="main">
                <Navbar />
                <div className="content-container">
                    <Section1 />
                    <Section3 />
                    <Section2 />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default index;
