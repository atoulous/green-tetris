import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { getPeer } from '../helpers/webRTC';

import storeState from '../middlewares/storeState';
import socketIO from '../middlewares/socketIO';
import logger from '../middlewares/logger';
import reducer from '../reducers';

// func here is to init peer
getPeer();

const middlewares = applyMiddleware(
  thunk,
  socketIO,
  storeState,
  logger
);

const store = createStore(reducer, middlewares);

export default store;
