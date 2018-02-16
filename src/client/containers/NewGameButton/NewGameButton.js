import React from 'react';
import { connect } from 'react-redux';

import * as webRTC from '../../helpers/webRTC';
import * as socket from '../../helpers/webSocket';

import { createGame } from '../../actions/socket';

const NewGameButton = ({ onButtonClick }) => (
  <div>
    <button onClick={onButtonClick}>
      create new game
    </button>
  </div>
);


const mapDispatchToProps = dispatch => ({
  onButtonClick: () => {
    dispatch(createGame({ webRTCId: webRTC.getPeer({ key: '7ie9ooeeas0grpb9' }).id, socketId: socket.getClient().id }));
  }
});

export default connect(null, mapDispatchToProps)(NewGameButton);
