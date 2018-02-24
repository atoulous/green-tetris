import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';

import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

import store from '../../store';
import { togglePlay } from '../../actions/tetris';

const TetrisView = ({ game }) => {

  console.log('game -- ', game);
  if (!game) return <Redirect to="/" />;

  return (
    <div className="container">
      <div className="tetris-view">
        <Tetris/>
        <TetrisPlayersList/>
      </div>
      {/* start button for testing only */}
      <RaisedButton label="start/stop" style={{display: 'inherit'}} onClick={() => store.dispatch(togglePlay())}/>
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps)(TetrisView);
