import tetris from './tetris';
import connexion from './connexion';

const finalReducer = combineReducers({
  tetris,
  connexion,
});

export tetris;
export connexion;
export default finalReducer;