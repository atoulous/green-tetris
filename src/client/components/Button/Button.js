import React from 'react';

import './Button.scss';

const ButtonTetris = (props) => {
  const { handleClick, label } = props;
  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
};

export default ButtonTetris;
