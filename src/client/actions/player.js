// Constants
export const SET_NICKNAME = 'SET_NICKNAME';
export const ADD_PLAYER = 'ADD_PLAYER';

// Action objects
export const setNickname = ({ webRTCId, nickname }) => ({
  type: SET_NICKNAME,
  data: { webRTCId, nickname },
});

export const addPlayer = ({ webRTCId, nickname }) => ({
  type: ADD_PLAYER,
  data: { webRTCId, nickname },
});
