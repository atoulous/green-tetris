import Peer from 'peerjs';

let peer;

export function getPeer(key) {
  if (peer) return peer;
  return new Peer({ key });
}
