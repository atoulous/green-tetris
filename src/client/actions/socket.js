// Constants
export const CREATE_GAME = 'CREATE_GAME';
export const JOIN_GAME = 'JOIN_GAME';

// Action objects
export const createGame = ({ webRTCId, socketId }) => ({
  type: 'socket',
  data: { call: '/game', path: '/create', webRTCId, socketId },
});

export const joinGame = ({ room, webRTCId, socketId }) => ({
  type: 'socket',
  data: { call: '/game', path: '/join', webRTCId, socketId, room },
});

export const setPlayerNickname = ({ nickname, webRTCId, room }) => ({
  type: 'socket',
  data: { call: '/player', path: '/nickname', webRTCId, nickname, room },
});
