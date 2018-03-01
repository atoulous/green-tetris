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
  if (state.game && state.game.hasStarted && !state.game.isSolo) {
    action.game.players.forEach((player) => {
      // we will take current player state to extract its spectrum
      const matched = state.game.players.find(({ id }) => (player.id === id));
      // and now we set it to new state
      player.spectrum = matched.spectrum || [];
    });
  }
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
