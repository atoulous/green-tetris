import React from 'react';
import { connect } from 'react-redux';

import './Score.scss';

const Score = ({ score }) => (
  <div className="score">
    {score}
  </div>
);

const mapStateToProps = state => ({
  score: state.score,
});

export default connect(mapStateToProps)(Score);
