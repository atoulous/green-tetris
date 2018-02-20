// Constants
export const CREATE_GAME = 'CREATE_GAME';
export const JOIN_GAME = 'JOIN_GAME';

// Action objects

/*
** Update back-end player payload (ex: nickname).
*/
export const socketUpdatePlayer = settings => ({
  type: 'socket',
  data: { call: '/player', path: '/update', settings },
});
/*
** Create game and set player as master. Will return a game updated to all player (only master).
*/
export const socketCreateGame = () => ({
  type: 'socket',
  data: { call: '/game', path: '/create' },
});
/*
** Join existing game. Will return a game updated to all players.
*/
export const socketJoinGame = gameId => ({
  type: 'socket',
  data: { call: '/game', path: '/join', gameId },
});
/*
** Leave existing game. Will return a game updated to all players.
*/
export const socketLeaveGame = gameId => ({
  type: 'socket',
  data: { call: '/game', path: '/leave', gameId },
});
/*
** Update existing game. Will return a game updated to all players.
*/
export const socketUpdateGame = (gameId, settings) => ({
  type: 'socket',
  data: { call: '/game', path: '/update', gameId, settings },
});
/*
** Kick player from existing game. Will return game updated to all players.
*/
export const socketKickPlayer = playerIdToDelete => ({
  type: 'socket',
  data: { call: '/player', path: '/kick', playerIdToDelete }
});

