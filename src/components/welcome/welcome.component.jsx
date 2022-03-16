import React from 'react';
import Button from '@mui/material/Button';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import './welcome.styles.css';

const Welcome = ({ name, description, onStart }) => {
  return (
    <div className="welcome" data-testid="welcome">
      <h1>{name}</h1>
      <p className="desc">{description}</p>

      <Button
          data-testid="start-btn"
          variant="outlined"
          sx={{ color: 'black' }}
          onClick={onStart}
        >
          Get started
      </Button>
      <p className="time"><AccessTimeFilledIcon /><span>Takes 5 mins</span></p>
    </div>
  )
}

export default Welcome;