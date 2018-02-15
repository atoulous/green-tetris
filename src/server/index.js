import { Server } from 'http';
import Express from 'express';

import appConfig from './config/app';
import routesConfig from './config/routes';
import logger from './helpers/logger';
import * as webSocket from './webSocket/socketManager';

import Game from './classes/Game';

export const app = new Express();
export const server = new Server(app);

export const allGames = [new Game({ room: 'oijf9898a' }), new Game({ room: 'ffhreuf8fhf' })];


/**
 * Start the web app.
 *
 * @returns {void}
 */
export async function start() {
  appConfig(app);
  routesConfig(app);
  webSocket.listen(server);

  try {
    await new Promise((resolve, reject) => server.listen(app.get('port'), err => (err ? reject(err) : resolve())));
    logger.info('✔ Server running on port', app.get('port'));
  } catch (err) {
    logger.error(err, '✘ An error happened at start');
  }
}

/**
 * Stop the web app gracefully.
 *
 * @returns {void}
 */
export async function stop() {
  webSocket.close();

  try {
    await new Promise((resolve, reject) => server.close(err => (err ? reject(err) : resolve())));
    logger.info('✔ Server stopped');
  } catch (err) {
    logger.error(err, '✘ An error happened at stop');
  }
}

if (!module.parent) {
  start();
}
