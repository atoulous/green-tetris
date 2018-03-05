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
  score: PropTypes.number
};

Score.defaultProps = {
  score: 0
};

export default Score;
