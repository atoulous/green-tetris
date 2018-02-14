import React from 'react';
import { connect } from 'react-redux';

import { increaseSpeed as increaseSpeedAction } from '../../actions/tetris';

const Speed = (props) => {
  const { speed, increaseSpeed } = props;
  return <button onClick={increaseSpeed}>{speed}</button>;
};

const mapStateToProps = state => ({
  speed: state.speed
});

const mapDispatchToProps = dispatch => ({
  increaseSpeed: () => {
    dispatch(increaseSpeedAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Speed);
