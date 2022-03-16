import React, { useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { saveInputResponse } from '../../../redux/saved-response/saved-response.actions';

const RadioInput = ({ question, answer, onChange }) => {
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    setValue(answer);
  }, [answer, setValue]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(saveInputResponse({ key: question.identifier, value: event.target.value }));
    onChange();
  };

  return (
    <div>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          defaultValue={value}
          onChange={handleChange}
        >
          {question?.choices.map((choice) => (
            <FormControlLabel value={choice.value} control={<Radio sx={{color: 'black', '&.Mui-checked': { color: 'black'}}} />} label={choice.label} key={choice.value} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioInput;