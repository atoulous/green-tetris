import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare';
import { RTCConnectionReducer, alertReducer } from './reducers';
import { RTCConnectionMessageAction, RTCConnectionAction } from './actions';
import App from './containers/app';

const params = {
  server:{
    host: '0.0.0.0',
    port: 3000,
    get url(){ return 'http://' + this.host + ':' + this.port },
  },
};
const socket = io(params.server.url);
const peer = new Peer({key: 'om3fcnn6mllkgldi'});
const initialState = { socket, peer };

const peerRTCMiddleware = (peer) => ({ dispatch, getState }) => {

  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id, getState());
    getState().socket.emit('peer', {id, room: params.server.url});
  });

  if (peer) {
    peer.on('connection', (conn) => {
      dispatch(RTCConnectionAction(conn));
    })
  }
  return next => action => {
    return next(action);
  }
};

const RTCConnMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type === 'RTC_CONN') {
    let channel = action.data;
    channel.on('data', (data) => {
      dispatch(RTCConnectionMessageAction(data));
    })
  }
  return next(action);
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch);
    socket.on('peer', newPeer => {
      if (newPeer.id !== getState().peer.id) {
        const conn = getState().peer.connect(newPeer.id);
        conn.on('open', () => {
          dispatch(RTCConnectionAction(conn));
        })
      }
    })
  }
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0) {
      socket.emit('action', action);
    }
    return next(action);
  }
};

const store = createStore(
  combineReducers({
    RTCConns: RTCConnectionReducer,
    message: alertReducer,
    socket: (state = socket) => state,
    peer: (state = peer) => state,
  }),
  initialState,
  applyMiddleware(
    thunk,
    socketIoMiddleWare(socket),
    peerRTCMiddleware(peer),
    RTCConnMiddleware
  )
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tetris')
);
