import React from "react";

import { increaseSpeed } from "../actions/tetris.js";
import { connect } from "react-redux";

let Speed = props => {
  console.log("render");
  const { speed, increaseSpeed } = props;
  return <button onClick={increaseSpeed}>{speed}</button>;
};

const mapStateToProps = state => {
  return {
    speed: state.tetris.speed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increaseSpeed: () => {
      dispatch(increaseSpeed());
    }
  };
};

Speed = connect(mapStateToProps, mapDispatchToProps)(Speed);

export default Speed;
