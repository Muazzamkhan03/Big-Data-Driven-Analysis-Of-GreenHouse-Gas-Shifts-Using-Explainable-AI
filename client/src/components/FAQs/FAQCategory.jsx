import React from 'react';
import FAQQuestion from './FAQQuestion';
import './FAQCategory.css';

const FAQCategory = ({ title, questions, index }) => {
  const categoryClass = index % 2 === 0 ? 'category-green-bg' : 'category-blue-bg';

  return (
    <div className={`faq-category ${categoryClass}`}>
      <h2 className="category-title">{title}</h2>
      {questions.map((faq, i) => (
        <FAQQuestion key={i} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQCategory;
