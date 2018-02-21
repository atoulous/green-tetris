import path from 'path';
import Game from '../classes/Game';

const INDEX = path.resolve(__dirname, '../../client', 'index.html');

/**
 * Api routes and rendering
 *
 * @param {object} app - the app instance
 * @returns {void}
 */
export default (app) => {
  /*
  ** Get all games.
  */
  app.get('/api/games', (req, res) => {
    let games = Game.allGames;
    games = games.map(game => game.format());
    res.json(JSON.stringify(games));
  });
  app.get('*', (req, res) => res.status(200).sendFile(INDEX));
};
