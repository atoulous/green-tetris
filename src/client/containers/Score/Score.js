import React from 'react';
import PropTypes from 'prop-types';

import './Score.scss';

const Score = ({ score }) => (
  <div className="score">
    <div><span>Score</span></div>
    <div><span>{score}</span></div>
  </div>
);

Score.propTypes = {
  score: PropTypes.number.isRequired
};

export default Score;
