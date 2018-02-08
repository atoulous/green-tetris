import { params, pieces, heightSize, widthSize } from "../constants.js";
import io from 'socket.io-client';
import Peer from 'peerjs';

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
  Object.keys(pieces).forEach(piece => {
    let pieceCopy = Object.assign({}, pieces[piece]);
    bag.push(pieceCopy);
    bag.push(pieceCopy);
  });
  return bag;
}

export const tetris = {
  gridWithoutCurrent: initGrid(),
  grid: initGrid(),
  currentPiece: null,
  bag: initBag(),
  speed: 1000,
};


/*
** Connexion
*/

// Init Socket and webRTC.
const socket = io(params.server.url);
const peer = new Peer({key: 'om3fcnn6mllkgldi'});


export const connexion = {
  socket: socket,
  peer: peer,
  rtc: [],
};

