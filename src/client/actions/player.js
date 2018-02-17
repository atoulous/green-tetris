// Constants
export const SET_NICKNAME = 'SET_NICKNAME';
export const SET_OWN_NICKNAME = 'SET_OWN_NICKNAME';
export const ADD_PLAYER = 'ADD_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';

// Action objects
export const setNickname = ({ webRTCId, nickname }) => ({
  type: SET_NICKNAME,
  data: { webRTCId, nickname },
});

export const setOwnNickname = ({ nickname }) => ({
  type: SET_OWN_NICKNAME,
  data: { nickname },
});

export const addPlayer = ({ webRTCId, nickname }) => ({
  type: ADD_PLAYER,
  data: { webRTCId, nickname },
});

export const setPlayers = ({ players }) => ({
  type: SET_PLAYERS,
  data: { players },
});
