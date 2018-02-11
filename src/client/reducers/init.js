import io from 'socket.io-client';
import Peer from 'peerjs';

import { params, pieces, heightSize, widthSize } from '../constants';

/*
** Tetris
*/

// Init array of arrays with all cells as objects.
function initGrid() {
  const grid = [];
  for (let i = 0; i < heightSize; i++) {
    const row = [];
    for (let j = 0; j < widthSize; j++) {
      row.push({
        fill: false
      });
    }
    grid.push(row);
  }
  return grid;
}

// Init new bag of pieces for randomization.
export function initBag() {
  const bag = [];
  Object.keys(pieces).forEach((piece) => {
    const pieceCopy = Object.assign({}, pieces[piece]);
    bag.push(pieceCopy);
    bag.push(pieceCopy);
  });
  return bag;
}

/*
export const tetris = {
  gridWithoutCurrent: initGrid(),
  grid: initGrid(),
  currentPiece: null,
  bag: initBag(),
  speed: 1000,
};

export const connexion = {
  socket,
  peer,
  rtc: [],
};
*/

/*
** Connexion
*/

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
};
