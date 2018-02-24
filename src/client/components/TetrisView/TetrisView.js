import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

import store from '../../store';
import { togglePlay } from '../../actions/tetris';

const TetrisView = ({ game, playerId }) => {
  if (!game) return <Redirect to="/" />;

  return (
    <div className="container">
      <div className="tetris-view">
        <Tetris game={game} playerId={playerId} />
        <TetrisPlayersList game={game} playerId={playerId} />
      </div>
      {/* start button for testing only */}
      <RaisedButton label="start/stop" style={{ display: 'inherit' }} onClick={() => store.dispatch(togglePlay())} />
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
  playerId: state.player.id,
});

TetrisView.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
};

TetrisView.defaultProps = {
  game: null,
  playerId: null,
};

export default connect(mapStateToProps)(TetrisView);
