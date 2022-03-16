import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { saveInputResponse } from '../../../redux/saved-response/saved-response.actions';


const TextInput = ({ question, answer, onChange }) => {
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
    <TextField
      fullWidth
      id="outlined-basic"
      label="Enter Text"
      variant="outlined"
      value={value}
      multiline={(question.multiline === 'true')}
      rows={4}
      onChange={handleChange}
    />
  );
}

export default TextInput;