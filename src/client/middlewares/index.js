//Import package middlewares
import thunk from 'redux-thunk';

//Import local middlewares
import logger from './logger';
import peerRTC from './peerRTC';
import RTCConn from './RTCConn';
import socketIO from './socketIO';
import storeState from './storeState';

export default const f = applyMiddleware(
	thunk,
	peerRTC,
	RTCConn,
	socketIO,
	storeState, 
	logger);