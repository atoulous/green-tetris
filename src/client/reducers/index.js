import { combineReducers } from 'redux';

import tetris from './tetris';
import connexion from './connexion';

const finalReducer = combineReducers({
  tetris,
  connexion,
});

export default finalReducer;
