import React from 'react';
import { connect } from 'react-redux';

import { callPeer, getPeer } from '../../helpers/webRTC';

const ShareAudio = ({ game }) => {

  return (
    <button onClick={() => {
      console.log(' cur game ===  ', game);
      game.players.forEach(({ webRTCId }) => {
        if (webRTCId !== getPeer().id) callPeer(webRTCId);
      });
    }}
    >
      parler en ligne
    </button>
  );

};
const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps)(ShareAudio);
