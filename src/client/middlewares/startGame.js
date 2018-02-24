import { setNewPiece, dropPiece } from '../actions/tetris';

export default ({ getState, dispatch }) => next => (action) => {
  const before = getState().game ? getState().game.hasStarted : false;
  next(action);
  const after = getState().game ? getState().game.hasStarted : false;
  console.log('bef - ', before, ' aft - ', after);
  if (before === false && after === true) {
    console.log('GAME IS STARTING RIGHT NOW');
    dispatch(setNewPiece());
  }
};
