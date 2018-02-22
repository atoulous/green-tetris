import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GamePlayers from '../../components/GamePlayers/GamePlayers';
import GameSettings from '../../components/GameSettings/GameSettings';

import './GameSettingsView.scss';

const GameSettingsView = ({ match, game, dispatch, playerId }) => {
  if (!game) return <Redirect to="/games" />;

  const isSolo = (match.params.id === 'solo');
  const player = game.players.find(p => p.id === playerId) || {};

  return (
    <div className="container">
      <div className="game-settings-view">
        <GameSettings game={game} dispatch={dispatch} player={player} />
        {!isSolo && <GamePlayers game={game} dispatch={dispatch} player={player} />}
      </div>
    </div>
  );
};

GameSettingsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  }).isRequired,
  playerId: PropTypes.string.isRequired,
};

GameSettingsView.defaultProps = {
  game: null,
};


const mapStateToProps = state => ({
  game: state.game,
  playerId: state.player.id,
});

export default connect(mapStateToProps)(GameSettingsView);

