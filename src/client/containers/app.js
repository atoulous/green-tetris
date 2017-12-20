import React from 'react';
import { connect } from 'react-redux';

const App = ({ message }) => (
  <div>
    <span>Hello word</span>
    <span>{message}</span>
  </div>
);

const mapStateToProps = (state) => ({
  message: state.message
});

export default connect(mapStateToProps, null)(App);
