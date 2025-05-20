import React from 'react';
import './FAQs.css';
import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';
import FAQCategory from '../../components/FAQs/FAQCategory';

const FAQs = () => {
  const faqData = [
    {
      category: 'GHG Forecasting with XAI',
      questions: [
        {
          question: 'What is the main goal of this project?',
          answer: 'The project aims to forecast greenhouse gas (GHG) emission trends using Big Data and Explainable AI (XAI), offering accurate and transparent insights to support climate change mitigation.'
        },
        {
          question: 'Why is Explainable AI (XAI) important in GHG prediction?',
          answer: 'XAI allows us to understand and trust AI-generated predictions by making the decision-making process transparent and interpretable.'
        },
        {
          question: 'What kind of data does the system use?',
          answer: 'It utilizes historical emissions data, meteorological records, socio-economic datasets, and real-time sensor networks.'
        },
        {
          question: 'Which machine learning models are used in the system?',
          answer: 'The platform leverages neural networks, gradient boosting machines, and support vector machines, enhanced with XAI techniques.'
        },
        {
          question: 'Who can benefit from this system?',
          answer: 'Researchers, policymakers, environmental agencies, and other stakeholders in climate and sustainability can benefit from this platform.'
        },
        {
          question: 'How does the web-based dashboard help users?',
          answer: 'The dashboard visualizes predictions and their explanations, allowing interactive exploration of emissions scenarios and decision support.'
        },
        {
          question: 'Is the system capable of handling real-time data?',
          answer: 'Yes, it is designed to incorporate and process real-time monitoring data for dynamic forecasting.'
        },
        {
          question: 'How accurate are the model predictions?',
          answer: 'Initial results show strong performance metrics, with models achieving high accuracy across test datasets.'
        },
        {
          question: 'What makes this system different from conventional GHG prediction tools?',
          answer: 'This platform combines Big Data scalability with XAI transparency, unlike many black-box models used today.'
        },
        {
          question: 'Can the platform be expanded or customized?',
          answer: 'Yes, it is modular and can be extended to include new regions, datasets, or forecasting targets.'
        },
        {
          question: 'How does the system support climate change policy-making?',
          answer: 'By providing interpretable forecasts, it helps bridge the gap between technical outputs and policy action.'
        },
        {
          question: 'Is the platform open to collaboration or integration with external systems?',
          answer: 'Absolutely. We welcome collaboration with research institutions, governments, and environmental organizations.'
        }
      ]
    }
  ];

  return (
    <div className="main-container roboto-regular">
      <Navbar />
      <div className="head1">
        <p>Frequently Asked Questions</p>
      </div>
      <div className="faqs-content">
        {faqData.map((category, index) => (
          <FAQCategory 
            key={index} 
            title={category.category} 
            questions={category.questions} 
            index={index}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
