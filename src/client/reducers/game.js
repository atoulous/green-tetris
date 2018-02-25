import { initGrid, initSpectrum } from '../utils/tetris';
// export function setGame(state, action) {
//   return { ...state, game: action.data.game };
// }
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

export function restartGame(state) {
  console.log('cur state -- ', state);
  return {
    ...state,
    game: {
      ...state.game,
      hasStarted: false,
      players: state.game.players.map(player => ({ ...player, spectrum: initSpectrum() }))
    },
    hasWon: null,
    piecesQueue: [],
    currentPiece: null,
    spectrum: initSpectrum(),
    gridWithoutCurrent: initGrid(),
    grid: initGrid(),
    onPause: false,
  };
}
