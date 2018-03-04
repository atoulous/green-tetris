/**
 * Handle Game list in AllGamesView
 */
export const UPDATE_GAMES_LIST = 'UPDATE_GAMES_LIST';
export const updateGamesList = gamesList => ({
  type: UPDATE_GAMES_LIST,
  gamesList,
});

/**
 * Handle Game object.
 */
export const UPDATE_GAME = 'UPDATE_GAME';
export const updateGame = game => ({
  type: UPDATE_GAME,
  game,
});

/**
 * Get all Games (thunk-function)
 */
export const getAllGames = () => (dispatch) => {
  return fetch('/api/games')
    .then(response => (response.json()))
    .then((json) => {
      dispatch(updateGamesList(json));
    });
};

export const END_GAME = 'END_GAME';
export const endGame = hasWon => ({
  type: END_GAME,
  data: hasWon,
});

export const RESTART_GAME = 'RESTART_GAME';
export const restartGame = () => ({
  type: RESTART_GAME,
});

export const LOCATION = 'LOCATION';
export const changeLocation = path => ({
  type: LOCATION,
  data: path,
});
