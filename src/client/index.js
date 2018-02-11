
// React
import React from 'react';
import ReactDom from 'react-dom';

// Redux
import { Provider } from 'react-redux';

// Import package middlewares
import thunk from 'redux-thunk';

import { combineReducers, createStore, applyMiddleware } from 'redux';

import App from './containers/app';
// Import local middlewares
import logger from './middlewares/logger';
import peerRTC from './middlewares/peerRTC';
import RTCConn from './middlewares/RTCConn';
import socketIO from './middlewares/socketIO';
import storeState from './middlewares/storeState';

import tetris from './reducers/tetris';
import connexion from './reducers/connexion';

const reducers = combineReducers({
  tetris,
  connexion,
});

const middlewares = applyMiddleware(
  thunk,
  // peerRTC,
  // RTCConn,
  // socketIO,
  storeState,
  logger
);

const store = createStore(reducers, middlewares);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tetris')
);
