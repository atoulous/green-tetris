import { Server } from 'http';
import Express from 'express';

import appConfig from './config/app';
import routesConfig from './config/routes';
import logger from './helpers/logger';
import socketio from './helpers/socketio';

const app = new Express();
const server = new Server(app);

/**
 * Start the web app.
 *
 * @returns {void}
 */
export async function start() {
  appConfig(app);
  routesConfig(app);

  socketio.listen(server);

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
