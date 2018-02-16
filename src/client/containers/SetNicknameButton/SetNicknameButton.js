import React from 'react';
import { connect } from 'react-redux';

import * as webRTC from '../../helpers/webRTC';

import { setPlayerNickname } from '../../actions/socket';

const NewGameButton = ({ onButtonClick }) => (
  <div>
    <button onClick={onButtonClick}>
      set nickname
    </button>
  </div>
);


const mapDispatchToProps = dispatch => ({
  onButtonClick: () => {
    dispatch(setPlayerNickname({ webRTCId: webRTC.getPeer().id, nickname: 'thibault', room: window.location.hash }));
  }
});

export default connect(null, mapDispatchToProps)(NewGameButton);
