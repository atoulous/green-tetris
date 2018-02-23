import React from 'react';
import { connect } from 'react-redux';

import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import { initAudioStream, getPeer, callPeer } from '../../helpers/webRTC';
import { toggleMuted } from '../../actions/connexion';

navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    /* use the stream */
    console.log('you are able to talk to others');
    initAudioStream(stream);
  })
  .catch((err) => {
    /* handle the error */
    console.log('you are NOT able to talk to others');
  });
/*
  sub component
 */

const StartChat = ({ players, audioStreams }) => {
  return (
    <RaisedButton
      label="START CHAT"
      onClick={() => {
        players.forEach(({ webRTCId }) => {
          if (webRTCId !== getPeer().id && !audioStreams.find(({from}) => (from === webRTCId))) callPeer(webRTCId);
        });
      }}
    />
  );
};

const getPlayersFromState = state => ({
  players: state.game.players,
  audioStreams: state.audioStreams,
});

const StartChatConnected = connect(getPlayersFromState)(StartChat);

/*
  sub component
 */

const ToggleMute = ({ muted, onToggleClick }) => {

  return (
    <div style={{ margin: '15 px', width: '30%' }}>
      <Toggle label="Mute Sound" onToggle={onToggleClick} toggled={muted} />
    </div>
  );

};

const mapDispatchToProps = dispatch => ({
  onToggleClick: (e, checked) => {
    dispatch(toggleMuted({ muted: checked }));
  }
});

const ToggleMuteConnected = connect(null, mapDispatchToProps)(ToggleMute);

/*
  main component
 */

const AudioContainer = ({ muted, audioStreams, dispatch }) => {
  return (
    <div>
      <StartChatConnected />
      <ToggleMuteConnected muted={muted} dispatch={dispatch}/>
      {
        audioStreams.map(({ stream }, i) => (<audio autoPlay muted={muted} key={i} src={window.URL.createObjectURL(stream)} />))
      }
    </div>
  );
};

const mapStateToProps = state => ({
  audioStreams: state.audioStreams,
  muted: state.muted,
});

export default connect(mapStateToProps)(AudioContainer);
