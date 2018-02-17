// Constants
export const SET_NICKNAME = 'SET_NICKNAME';
export const SET_OWN_NICKNAME = 'SET_OWN_NICKNAME';
export const ADD_PLAYER = 'ADD_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';
export const OPEN_NICKNAME_MODAL = 'OPEN_NICKNAME_MODAL';
export const CLOSE_NICKNAME_MODAL = 'CLOSE_NICKNAME_MODAL';
export const UPDATE_NICKNAME = '  UPDATE_NICKNAME';

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

export function openNicknameModal() {
  return { type: OPEN_NICKNAME_MODAL };
}

export function closeNicknameModal() {
  return { type: CLOSE_NICKNAME_MODAL };
}

export function updateNickname(nickname) {
  return { type: UPDATE_NICKNAME, nickname };
}
