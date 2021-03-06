import socketio from 'socket.io';

import logger from '../helpers/logger';

import handlePieceSocket from './handlePieceSocket';
import handlePlayerSocket from './handlePlayerSocket';
import handleGameSocket from './handleGameSocket';

import Player from '../classes/Player';

let io = null;

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

    /**
     * Open socket messages handlers
     */
    socket.on('/game', data => handleGameSocket(socket.id, data));
    socket.on('/piece', data => handlePieceSocket(socket.id, data));
    socket.on('/player', data => handlePlayerSocket(socket.id, data));

    /**
     * Create new Player for each new connexion
     */
    new Player(socket); // eslint-disable-line no-new

    /**
     * Handle deconnexion
     */
    socket.on('disconnect', () => {
      const data = { path: '/deconnexion' };
      handlePlayerSocket(socket.id, data);
    });
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

