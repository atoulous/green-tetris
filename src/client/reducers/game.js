export function setGame(state, action) {
  return { ...state, game: action.data.game };
}
