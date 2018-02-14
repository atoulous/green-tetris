import React from 'react';

import './Label.scss';

const Label = ({ children, additionalClasses }) => {
  const classes = additionalClasses || [];
  const classNames = `customLabel ${classes.join(' ')}`;

  return (
    <div className={classNames}>{children}</div>
  );
};

export default Label;
