import React from 'react';
import './section3style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faClipboardCheck, faChartLine, faHandPointer } from '@fortawesome/free-solid-svg-icons';

const Section3 = () => {
  return (
    <div className="section3-container" id='features'>
      <h2 className="section3-title">Why Use This Tool?</h2>
      <p className="section3-description">
        Our platform combines advanced AI with intuitive design to help you understand and reduce your environmental impact.
      </p>
      
      <div className="features-grid">
        <div className="feature-card">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="feature-icon" />
          <h3>Explainable AI at Your Fingertips</h3>
          <p>Gain transparent insights into greenhouse gas predictions with XAI, helping you understand the why behind every forecast.</p>
        </div>

        <div className="feature-card">
          <FontAwesomeIcon icon={faClipboardCheck} className="feature-icon" />
          <h3>Actionable Recommendations</h3>
          <p>Receive tailored, actionable steps to mitigate emissions and align your actions with sustainability goals.</p>
        </div>

        <div className="feature-card">
          <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
          <h3>Future-Ready Predictions</h3>
          <p>Stay ahead with accurate GHG forecasts powered by advanced machine learning, designed to drive impactful decisions.</p>
        </div>

        <div className="feature-card">
          <FontAwesomeIcon icon={faHandPointer} className="feature-icon" />
          <h3>Intuitive and Interactive Design</h3>
          <p>Explore a user-friendly platform with dynamic visualizations, interactive tools, and customizable features to meet your needs.</p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
