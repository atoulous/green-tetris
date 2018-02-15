import React from 'react';
import { connect } from 'react-redux';

import './Score.scss';

const Score = ({ score }) => (
  <div className="score">
    <div><span>Score</span></div>
    <div><span>{score}</span></div>
  </div>
);

const mapStateToProps = state => ({
  score: state.score,
});

export default connect(mapStateToProps)(Score);
