import React from "react";

import { connect } from "react-redux";
import { togglePlay } from "../actions/tetris.js";

let StartDisplay = ({ isPlaying, start }) => {
  return <button onClick={start}>{isPlaying ? "Stop" : "Start"}</button>;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    start: () => {
      dispatch(togglePlay());
    }
  };
};

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying
  };
};

export default (StartDisplay = connect(mapStateToProps, mapDispatchToProps)(
  StartDisplay
));
