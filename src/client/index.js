import io from 'socket.io-client';
import Peer from 'peerjs';

// React

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

// Import package middlewares
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';

import App from './containers/app';
// Import local middlewares
import logger from './middlewares/logger';
import peerRTC from './middlewares/peerRTC';
import RTCConn from './middlewares/RTCConn';
import socketIO from './middlewares/socketIO';
import storeState from './middlewares/storeState';

import { initBag, initGrid, initSpectrum } from './helpers';
import { params } from './constants';

import reducer from './reducers';

// Init Socket and webRTC.
const socket = io(params.server.url);
const peer = new Peer({ key: 'om3fcnn6mllkgldi' });

export const initialState = {
  socket,
  peer,
  RTCConns: [],
  gridWithoutCurrent: initGrid(),
  grid: initGrid(),
  currentPiece: null,
  bag: initBag(),
  speed: 1000,
  spectrum: initSpectrum(),
  score: 0,
  players: [{name: 'Me', id: 0,  score: 0, spectrum: initSpectrum()}],
};

const middlewares = applyMiddleware(
  thunk,
  socketIO(socket),
  peerRTC(peer),
  RTCConn,
  storeState,
  logger
);

const store = createStore(reducer, middlewares);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tetris')
);
