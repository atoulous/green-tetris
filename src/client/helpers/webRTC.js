import Peer from 'peerjs';

let peer;

export function newPeer(key) {
  return new Peer({ key });
}

export function getPeer(key) {
  if (peer) return peer;

  return newPeer(key);
}
