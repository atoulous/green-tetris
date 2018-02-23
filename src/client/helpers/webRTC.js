import Peer from 'peerjs';

import { RTCConnectionMessage, addAudioStream } from '../actions/connexion';
import store from '../store';

let peer = null;
let audioInputStream = null;
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
    peer.on('call', (call) => {
      // Answer the call, providing our mediaStream
      console.log('call is -- ', call);
      call.answer(audioInputStream);
      call.on('stream', (stream) => {
        // should dispatch to update client audioReceiver to add stream to audio element
        store.dispatch(addAudioStream({ from: call.peer, stream }));
      });
    });
  }
  return peer;
}

export function getAudioStream() {
  return audioInputStream;
}

export function initAudioStream(stream) {
  audioInputStream = stream;
}

export function callPeer(peerId) {
  if (audioInputStream) {
    const call = getPeer().call(peerId, audioInputStream);
    call.on('stream', (stream) => {
      // should dispatch to update client audioReceiver to add stream to audio element
      store.dispatch(addAudioStream({ from: peerId, stream }));
    });
  }
}

export const sendDataToPeers = (data) => {
  getRTCConns().forEach((channel) => {
    channel.send(data);
  });
};
