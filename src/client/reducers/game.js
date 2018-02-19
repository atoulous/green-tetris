export function setGame(state, action) {
  return { ...state, game: action.data.game };
}


export function updateGamesList(state, action) {
  return { ...state, gamesList: action.gamesList };
}

export function updateGame(state, action) {
  return { ...state, game: action.game };
}
