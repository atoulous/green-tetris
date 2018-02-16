import Peer from 'peerjs';

import { RTCConnectionMessage } from '../actions/connexion';
import store from '../store';

let peer = null;
const RTCConns = [];

export function getPeer({ key }) {
  if (!peer) peer = new Peer({ key });
  return peer;
}

export function getRTCConns() {
  return RTCConns;
}

export function addRTCConn(conn) {
  getRTCConns().push(conn);
  conn.on('data', (data) => {
    store.dispatch(RTCConnectionMessage(data));
  });
}

export const sendDataToPeers = (data) => {
  getRTCConns().forEach((channel) => {
    channel.send(data);
  });
};
