import React from 'react';
import './section1style.css';
import { useNavigate } from 'react-router-dom';


const Section1 = () => {
   const navigate = useNavigate();

  return (
    <div className="section1-container" >
      <div className="section1-content">
        <h1 className="section1-title">Predict & Understand Your Environmental Impact</h1>
        <p className="section1-description">
          Empower smarter climate action with XAI-driven predictions and transparent insights on greenhouse gases.
        </p>
        <div className="section1-buttons">
          <button className="btn start-btn" onClick={() => navigate('/dashboard/prediction')}>Start Predicting</button>
          <button className="btn learn-btn" onClick={() => navigate('/faqs')}>Learn More</button>
        </div>
      </div>
      <div className="section1-image">
        {/* Replace with an <img> tag if needed */}
        <div className="globe-placeholder"></div>
      </div>
    </div>
  );
};

export default Section1;
