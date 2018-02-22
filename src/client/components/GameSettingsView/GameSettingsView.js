import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GamePlayers from '../../components/GamePlayers/GamePlayers';
import GameSettings from '../../components/GameSettings/GameSettings';

import TestRTC from '../../containers/RTCtest/RTCTest';
import TestAudio from '../../containers/AudioTest/AudioTest';
import AudioContainer from '../../containers/AudioContainer/AudioContainer';
import GetAudio from '../GetAudioStream/GetAudioStream';

import './GameSettingsView.scss';

const GameSettingsView = ({ match, game, dispatch }) => {
  if (!game) return <Redirect to="/games" />;

  const isSolo = (match.params.id === 'solo');
  const p = (isSolo) ? null : <GamePlayers game={game} dispatch={dispatch} />;
  return (
    <div className="container">
      <div className="game-settings-view">
        <GameSettings game={game} dispatch={dispatch} />
        {p}
      </div>
      <TestRTC />
      <GetAudio />
      <TestAudio />
      <AudioContainer />
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
  game: null,
};


const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps)(GameSettingsView);

