import React, { useState } from 'react';
import ChoiceInput from '../choice-input/choice-input.component';
import Question from '../question/question.component';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector } from 'react-redux';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import './questionnaire.styles.css';
import ThankYou from '../thank-you/thank-you.component';

const Questionnaire = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animation, setAnimation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const lastQuestionId = questions[questions.length - 1].identifier;

  const data = useSelector((state) => state.data);
  const currentQuestionResponse = data.savedResponse.get(
    currentQuestion.identifier
  );

  const onPrev = () => {
    setAnimation('slide-down-out');
    setTimeout(() => {
      setAnimation('slide-down-in');
      let prevQuestion = currentQuestion.prev;
      const destinationQuestionIndex = questions.findIndex((item) => {
        return item.identifier === prevQuestion.identifier;
      });
      setCurrentQuestionIndex(destinationQuestionIndex);
      setCurrentQuestion(prevQuestion);
    }, 400);
  };

  const onNext = () => {
    onEnter();
  };

  const onEnter = () => {
    setAnimation('slide-up-out');
    if (currentQuestionIndex !== questions.length - 1) {
      setTimeout(() => {
        setAnimation('slide-up-in');

        let nextQuestion;

        if (currentQuestion.jumps.length === 0) {
          nextQuestion = questions[currentQuestionIndex + 1];
          setCurrentQuestionIndex((cv) => cv + 1);
        } else {
          const jumpObj = currentQuestion.jumps.find((item) => {
            return item.conditions[0].value === currentQuestionResponse;
          });
          const destinationQuestionIndex = questions.findIndex((item) => {
            return item.identifier === jumpObj.destination.id;
          });
          setCurrentQuestionIndex(destinationQuestionIndex);
          nextQuestion = questions[destinationQuestionIndex];
        }
        nextQuestion['prev'] = currentQuestion;
        setCurrentQuestion(nextQuestion);
      }, 400);
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <div data-testid="questionnaire" className={`container ${animation}`}>
      {/* <strong>{currentQuestion.jumps.length}</strong> */}
      <Question questionText={currentQuestion.headline} />
      <ChoiceInput question={currentQuestion} />
      <ButtonGroup
        variant="outlined"
        size="large"
        aria-label="outlined primary button group"
      >
        <Button
          disabled={currentQuestionIndex === 0}
          onClick={onPrev}
          title="Prev"
          sx={{ color: 'black' }}
        >
          <ArrowUpwardRoundedIcon />
        </Button>
        <Button
          disabled={currentQuestionResponse ? false : true}
          sx={{ color: 'black' }}
          onClick={onEnter}
        >
          {currentQuestion.identifier === lastQuestionId ? 'Submit' : 'OK'}
        </Button>
        <Button
          disabled={
            currentQuestionResponse &&
            currentQuestionIndex !== questions.length - 1
              ? false
              : true
          }
          sx={{ color: 'black' }}
          onClick={onNext}
          title="Next"
        >
          <ArrowDownwardRoundedIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Questionnaire;
