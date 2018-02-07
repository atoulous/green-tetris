import path from 'path';

const INDEX = path.resolve(__dirname, '../../client', 'index.html');

/**
 * Api routes and rendering
 *
 * @param {object} app - the app instance
 * @returns {void}
 */
export default (app) => {
  app.get('*', (req, res) => res.status(200).sendFile(INDEX));
};