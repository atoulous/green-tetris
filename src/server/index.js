import { Server } from 'http';
import Express from 'express';
import socketio from 'socket.io';

import appConfig from './config/server';
import logger from '../helpers/logger';

const app = new Express();
const server = new Server(app);

/**
 * Start listening web sockets.
 *
 * @returns {void}
 */
function socketListen() {
  const io = socketio(server);

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('action', (action) => {
      if (action.type === 'server/ping') {
        socket.emit('action', { type: 'pong' })
      }
    })
  })
}

/**
 * Start the web app.
 *
 * @returns {void}
 */
export async function start() {
  appConfig(app);
  socketListen();

  server.listen(app.get('port'));
}

/**
 * Stop the web app gracefully.
 *
 * @returns {void}
 */
export async function stop() {
  await new Promise((resolve, reject) => server.close(err => (err ? reject(err) : resolve())));
}

if (!module.parent) {
  start()
    .then(() => logger.info('✔ Server running on port', app.get('port')))
    .catch(err => logger.error(err, '✘ An error happened'));
}
