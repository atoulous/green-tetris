import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const App = ({ message }) => (
  <div>
    <span>Hello word !</span>
    <br />
    <span>{message}</span>
  </div>
);

App.propTypes = {
  message: PropTypes.string
};

App.defaultProps = {
  message: 'default message'
};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps, null)(App);
