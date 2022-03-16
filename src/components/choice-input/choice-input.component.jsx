import React from 'react';
import { useSelector } from 'react-redux';

import RadioInput from './radio-input/radio-input.component';
import TextInput from './text-input/text-input.component';

const QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TEXT: 'text'
}

const ChoiceInput = ({ question }) => {
  const { question_type: questionType, multiple: isMultiSelect } = question;
  const savedResponse = useSelector(state => state.data.savedResponse);
  const currentQuestionResponse = savedResponse.get(question.identifier);

  if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE && isMultiSelect === 'false') {
    return (
      <div>
        <RadioInput question={question} answer={ currentQuestionResponse ? currentQuestionResponse : null } />
      </div>
    );
  } else {
    return (
      <div style={{width: '50%'}}>
        <TextInput question={question} answer={ currentQuestionResponse ? currentQuestionResponse : '' } />
      </div>
    )
  }
};

export default ChoiceInput;
