import React from 'react';
import { connect } from 'react-redux';

import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import { initAudioStream, getPeer, callPeer } from '../../helpers/webRTC';
import { toggleMuted, hasCalled } from '../../actions/connexion';

import './AudioContainer.scss';

navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    /* use the stream */
    initAudioStream(stream);
  })
  .catch((err) => {
    /* handle the error */
    console.log('you are NOT able to talk to others');
  });
/*
  sub component
 */

const StartChat = ({ players, audioStreams, dispatch, hasCalledState }) => {
  if (hasCalledState) return (null);
  return (
    <RaisedButton
      label="START CHAT"
      onClick={() => {
        dispatch(hasCalled());
        players.forEach(({ webRTCId }) => {
          if (webRTCId !== getPeer().id && !audioStreams.find(({ from }) => (from === webRTCId))) callPeer(webRTCId);
        });
      }}
    />
  );
};

const getPlayersFromState = state => ({
  players: state.game.players,
  audioStreams: state.audioStreams,
  hasCalledState: state.hasCalled,
});

const StartChatConnected = connect(getPlayersFromState)(StartChat);

/*
  sub component
 */

const ToggleMute = ({ muted, onToggleClick, hasCalled }) => (
  <div style={{ margin: '15 px', width: '30%' }}>
    <Toggle disabled={!hasCalled} label={muted ? 'UNMUTE' : 'MUTE'} onToggle={onToggleClick} toggled={muted} />
  </div>
);

const mapDispatchToProps = dispatch => ({
  onToggleClick: (e, checked) => {
    dispatch(toggleMuted({ muted: checked }));
  }
});

const ToggleMuteConnected = connect(null, mapDispatchToProps)(ToggleMute);

/*
  main component
 */

const AudioContainer = ({ muted, audioStreams, dispatch, hasAudio, hasCalled }) => {
  if (!hasAudio) return (null);
  return (
    <div className="flex">
      <StartChatConnected />
      <ToggleMuteConnected muted={muted} dispatch={dispatch} hasCalled={hasCalled} />
      {
          audioStreams.map(({ stream }, i) => (
            <audio autoPlay muted={muted} key={i} src={window.URL.createObjectURL(stream)} />))
        }
    </div>
  );
};

const mapStateToProps = state => ({
  audioStreams: state.audioStreams,
  muted: state.muted,
  hasAudio: state.hasAudio,
  hasCalled: state.hasCalled,
});

export default connect(mapStateToProps)(AudioContainer);
