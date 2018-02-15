import React from 'react';

import './Alert.scss';

const Alert = ({ message, hidden }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const alertStyle = {
    position: 'relative',
    bottom: '150px',
    width: '100px',
    height: '60px',
    backgroundColor: 'white',
    border: 'solid grey 1px',
    lineHeight: '60px'
  };

  return (
    <div style={containerStyle}>
      <div style={alertStyle} hidden={hidden}>
        {message}
      </div>
    </div>
  );
};

export default Alert;
