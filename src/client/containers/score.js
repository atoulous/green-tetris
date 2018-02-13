import React from 'react';
import { connect } from 'react-redux';


const Score = (props) => <div className='score'><label>{props.score}</label></div>

const mapStateToProps = state => ({
  score: state.score,
});

export default connect(mapStateToProps)(Score);