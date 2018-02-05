import { Server } from 'http';
import Express from 'express';

import appConfig from './config/app';
import routesConfig from './config/routes';
import logger from './helpers/logger';
import * as socketio from './helpers/socketio';

export const app = new Express();
export const server = new Server(app);

/**
 * Start the web app.
 *
 * @returns {void}
 */
export async function start() {
  appConfig(app);
  routesConfig(app);
  socketio.listen(server);

  try {
    await server.listen(app.get('port'));
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
  socketio.close();

  try {
    await server.close();
    logger.info('✔ Server stopped');
  } catch (err) {
    logger.error(err, '✘ An error happened at stop');
  }
}

if (!module.parent) {
  start();
}
