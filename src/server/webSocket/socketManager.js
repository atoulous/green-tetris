import socketio from 'socket.io';

import Game from '../classes/Game';
import Player from '../classes/Player';
import logger from '../helpers/logger';

let io = null;

const allGames = [new Game({ room: 'oijf9898a' }), new Game({ room: 'ffhreuf8fhf' })];

/**
 * handle Game socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export async function handleGameSocket(data) {
  const { path } = data;
  switch (path) {
    case '/join': {
      console.log('new peer joined the Game', data);
      const { room, id, socket } = data;
      const currrentGame = allGames.find(game => (game.room === room));
      if (currrentGame) {
        currrentGame.broadcast(io, '/Game', { path: '/join', id });
        currrentGame.players.push(new Player({ socket, id }));
      }
      break;
    }
    default:
      console.log('default triggered');
      break;
  }
}

/**
 * handle piece socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export async function handlePieceSocket(data) {
  if (data.path === '/new') {
    // do new piece

    // io.sockets.to().emit('', );
  }
}

/**
 * handle Player socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export async function handlePlayerSocket(data) {
  if (data.path === '/new') {
    // do new Player

    // io.sockets.to().emit('', );
  }
}

/**
 * Start listening to a server instance.
 *
 * @param {object} server - the http server instance
 * @return {object} the io server instance
 */
export function listen(server) {
  io = socketio(server);

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('/Game', data => handleGameSocket(data));
    socket.on('/piece', data => handlePieceSocket(data));
    socket.on('/Player', data => handlePlayerSocket(data));
  });

  return io;
}

/**
 * Get the socket io connection.
 *
 * @return {object} the io server instance
 */
export function getConnection() {
  return io;
}

/**
 * Close the connection.
 *
 * @param {Function} [cb] - the callback
 * @return {void}
 */
export function close(cb) {
  if (io) {
    io.close();
    io = null;
  }
  if (cb) cb();
}

