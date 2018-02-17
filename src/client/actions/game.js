// Constants
export const SET_GAME = 'SET_GAME';

// Action objects
export const setGame = ({ game }) => ({
  type: SET_GAME,
  data: { game },
});
