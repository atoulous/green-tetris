import { initGrid, initSpectrum } from '../utils/tetris';

/**
 * Update gameList in redux-tree.
 */
export function updateGamesList(state, action) {
  return { ...state, gamesList: action.gamesList };
}

/**
 * Update game in redux-tree.
 */
export function updateGame(state, action) {
  return { ...state, game: action.game };
}

export function endGame(state, action) {
  return { ...state, hasWon: action.data, onPause: true };
}

export function location(state, action) {
  return { ...state, location: action.data, };
}

export function restartGame(state) {
  return {
    ...state,
    game: {
      ...state.game,
      hasStarted: false,
      players: state.game.players.map(
        player => ({ ...player, spectrum: initSpectrum(), isReady: false }))
    },
    audioStreams: [],
    hasCalled: false,
    hasWon: null,
    piecesQueue: [],
    currentPiece: null,
    spectrum: initSpectrum(),
    gridWithoutCurrent: initGrid(),
    grid: initGrid(),
    onPause: false,
  };
}
