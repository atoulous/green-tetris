import path from 'path';
import { getGames } from '../helpers/game';

const INDEX = path.resolve(__dirname, '../../client', 'index.html');

/**
 * Api routes and rendering
 *
 * @param {object} app - the app instance
 * @returns {void}
 */
export default (app) => {
  app.get('/games', (req, res) => {
    const gamesWaiting = getGames().filter(game => (!game.hasStarted));
    res.json(JSON.stringify(gamesWaiting));
  });
  app.get('*', (req, res) => res.status(200).sendFile(INDEX));
};
