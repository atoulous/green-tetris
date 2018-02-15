import Peer from 'peerjs';

let peer = null;

export function getPeer(key) {
  if (!peer) peer = new Peer({ key });
  return peer;
}
