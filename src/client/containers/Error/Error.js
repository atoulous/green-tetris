import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import './Error.scss';
import actions from '../../actions';

const { updateError } = actions;


const Error = ({ error, dispatch }) => {
  /**
 * Set error to null.
 */
  const _closeModal = () => {
    dispatch(updateError(null));
  };

  const isErrorOpen = (error !== null);
  const _error = error || {};

  const actionsModal = [
    <FlatButton
      label="Ok"
      onClick={_closeModal}
      primary
    />,
  ];

  return (
    <Dialog
      title={_error.name || 'Error'}
      actions={actionsModal}
      modal={false}
      open={isErrorOpen}
      onRequestClose={_closeModal}
    >
      {_error.message || 'Error !'}
    </Dialog>
  );
};

const mapStateToProps = state => ({
  error: state.error,
});

Error.propTypes = {
  error: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

Error.defaultValue = {
  error: null,
};

export default connect(mapStateToProps)(Error);
