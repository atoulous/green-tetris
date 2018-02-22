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
 * Handle Error Dialog
 */
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const updateError = error => ({ type: UPDATE_ERROR, error });

/**
 * Get all Games (thunk-function)
 */
export const getAllGames = () => (dispatch) => {
  fetch('/api/games')
    .then(response => response.json())
    .then((json) => {
      const games = JSON.parse(json);
      dispatch(updateGamesList(games));
    });
};
