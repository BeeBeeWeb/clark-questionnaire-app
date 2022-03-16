import React from 'react';

import './question.styles.css';


const Question = ({ questionText }) => {
  return (
    <div>
      <h1>{questionText}</h1>
    </div>
  )
};

export default Question;