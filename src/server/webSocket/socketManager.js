import socketio from 'socket.io';

import logger from '../helpers/logger';

let io = null;

/**
 * handle game socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export async function handleGameSocket(data) {
  if (data.path === '/new') {
    // do new game

    // io.sockets.to().emit('', );
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
 * handle player socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export async function handlePlayerSocket(data) {
  if (data.path === '/new') {
    // do new player

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

    socket.on('/game', data => handleGameSocket(data));
    socket.on('/piece', data => handlePieceSocket(data));
    socket.on('/player', data => handlePlayerSocket(data));
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

