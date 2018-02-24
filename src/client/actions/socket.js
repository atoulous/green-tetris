// Constants
export const CREATE_GAME = 'CREATE_GAME';
export const JOIN_GAME = 'JOIN_GAME';

// Action objects

/**
 * Update back-end player payload (ex: nickname)
 *
 * @param settings
 * @returns {{type: string, data: {call: string, path: string, settings: *}}}
 */
export const socketUpdatePlayer = settings => ({
  type: 'socket',
  data: { call: '/player', path: '/update', settings },
});

/**
 * Create game and set player as master. Will return a game updated to all player (only master)
 *
 * @param settings
 * @returns {{type: string, data: {call: string, path: string, settings: {}}}}
 */
export const socketCreateGame = (settings = {}) => ({
  type: 'socket',
  data: { call: '/game', path: '/create', settings },
});

/**
 * Join existing game. Will return a game updated to all players
 *
 * @param gameId
 * @returns {{type: string, data: {call: string, path: string, gameId: *}}}
 */
export const socketJoinGame = gameId => ({
  type: 'socket',
  data: { call: '/game', path: '/join', gameId },
});

/**
 * Leave existing game. Will return a game updated to all players
 *
 * @param gameId
 * @returns {{type: string, data: {call: string, path: string, gameId: *}}}
 */
export const socketLeaveGame = gameId => ({
  type: 'socket',
  data: { call: '/game', path: '/leave', gameId },
});

/**
 * Update existing game. Will return a game updated to all players
 *
 * @param gameId
 * @param settings
 * @returns {{type: string, data: {call: string, path: string, gameId: *, settings: *}}}
 */
export const socketUpdateGame = (gameId, settings) => ({
  type: 'socket',
  data: { call: '/game', path: '/update', gameId, settings },
});

/**
 * Kick player from existing game. Will return game updated to all players
 *
 * @param playerIdToDelete
 * @returns {{type: string, data: {call: string, path: string, playerIdToDelete: *}}}
 */
export const socketKickPlayer = playerIdToDelete => ({
  type: 'socket',
  data: { call: '/player', path: '/kick', playerIdToDelete }
});

/**
 *
 * @param room
 * @returns {{type: string, data: {call: string, path: string, room: *}}}
 */
export const newPiece = ({ gameId }) => ({
  type: 'socket',
  data: { call: '/piece', path: '/new', gameId },
});

/**
 * Inform backend that player has completed a line.
 */
export const socketLineCompleted = () => ({
  type: 'socket',
  data: { call: '/game', path: '/line' },
});

