import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GamePlayers from '../../components/GamePlayers/GamePlayers';
import GameSettings from '../../components/GameSettings/GameSettings';

import './GameSettingsView.scss';

const GameSettingsView = ({ match, game, dispatch }) => {
  const isSolo = (match.params.id === 'solo');
  return (
    <div className="container">
      <div className="game-settings-view">
        {!isSolo && <GamePlayers game={game} dispatch={dispatch} />}
        <GameSettings game={game} dispatch={dispatch} />
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

};

GameSettingsView.defaultProps = {
  game: {},
};


const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps)(GameSettingsView);

