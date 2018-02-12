import React from 'react';
import { connect } from 'react-redux';
import ButtonTetris from '../components/button';
import actions from '../actions';

const { addRow } = actions;

const mapDispatchToProps = (dispatch) => ({
    handleClick: () => {
        dispatch(addRow());
    }
});

const addRowButton = connect(null, mapDispatchToProps)(ButtonTetris);

export default addRowButton;
