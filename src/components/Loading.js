import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = ({ height }) => {
  const style = {
    width: '100%',
    height: height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={style}>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loading;
