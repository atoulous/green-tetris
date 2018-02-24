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
