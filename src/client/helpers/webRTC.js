import Peer from 'peerjs';

import { RTCConnectionMessage } from '../actions/connexion';
import store from '../store';

let peer = null;
const RTCConns = [];

export function getRTCConns() {
  return RTCConns;
}

export function addRTCConn(conn) {
  getRTCConns().push(conn);
  conn.on('data', (data) => {
    store.dispatch(RTCConnectionMessage(data));
  });
}

export function getPeer() {
  if (!peer) {
    peer = new Peer({ key: '7ie9ooeeas0grpb9' });
    peer.on('open', (webRTCId) => {
      console.log(`My peer ID is: ${webRTCId}`);
    });

    peer.on('connection', (conn) => {
      addRTCConn(conn);
    });
  }
  return peer;
}

export const sendDataToPeers = (data) => {
  getRTCConns().forEach((channel) => {
    channel.send(data);
  });
};
