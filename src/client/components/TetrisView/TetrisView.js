import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

import store from '../../store';
import { togglePlay } from '../../actions/tetris';

const TetrisView = ({ game, playerId, onPause }) => {
  if (!game) return <Redirect to="/" />;

  return (
    <div className="container">
      <div className="tetris-view">
        <Tetris game={game} playerId={playerId} />
        <TetrisPlayersList game={game} playerId={playerId} />
      </div>
      {/* start button for testing only */}
      <Toggle label="Pause Game" onToggle={() => store.dispatch(togglePlay())} toggled={onPause} />
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
  playerId: state.player.id,
  onPause: state.onPause,
});

TetrisView.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
  onPause: PropTypes.bool,
};

TetrisView.defaultProps = {
  game: null,
  playerId: null,
  onPause: false,
};

export default connect(mapStateToProps)(TetrisView);
