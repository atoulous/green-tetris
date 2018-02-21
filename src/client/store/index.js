import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import storeState from '../middlewares/storeState';
import socketIO from '../middlewares/socketIO';
import logger from '../middlewares/logger';
import reducer from '../reducers';

const middlewares = applyMiddleware(
  thunk,
  socketIO,
  storeState,
  logger
);

const store = createStore(reducer, middlewares);

export default store;
