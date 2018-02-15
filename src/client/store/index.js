import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as webSocket from '../helpers/webSocket';
import * as webRTC from '../helpers/webRTC';

import storeState from '../middlewares/storeState';
import peerRTC from '../middlewares/peerRTC';
import socketIO from '../middlewares/socketIO';
import RTCConn from '../middlewares/RTCConn';
import logger from '../middlewares/logger';
import reducer from '../reducers';

const socket = webSocket.getClient();
const peer = webRTC.getPeer({ key: '7ie9ooeeas0grpb9' });
console.log('bonjour  per -', peer);

const middlewares = applyMiddleware(
  thunk,
  socketIO(socket),
  peerRTC(peer),
  RTCConn,
  storeState,
  logger
);

const store = createStore(reducer, middlewares);

export default store;
