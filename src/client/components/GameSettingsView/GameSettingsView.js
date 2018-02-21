import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GamePlayers from '../../components/GamePlayers/GamePlayers';
import GameSettings from '../../components/GameSettings/GameSettings';

import TestRTC from '../../containers/RTCtest/RTCTest';
import TestAudio from '../../containers/AudioTest/AudioTest';

import { initAudioStream, } from '../../helpers/webRTC';

import './GameSettingsView.scss';

const GetAudio = () => {
  return (
    <button onClick={() => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          /* use the stream */
          console.log('stream to add to store -- ', stream);
          initAudioStream(stream);
        })
        .catch((err) => {
          /* handle the error */
          console.log('eerrr - - ', err);
        });
      }}
    >
      mets le son
    </button>

  );
};

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

