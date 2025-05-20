import React, { useState } from 'react';
import './FAQQuestion.css'; // Ensure you create the required CSS classes.

const FAQQuestion = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const containerClass = index % 2 === 0 ? 'faq-question green-bg' : 'faq-question blue-bg';

  return (
    <div className={`${containerClass} roboto-bold`}>
      <div className="faq-question-header" onClick={toggleOpen}>
        <span className='ques'>{question}</span>
        <span className='sign'>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default FAQQuestion;
