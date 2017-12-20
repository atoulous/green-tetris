import Express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';
import moment from 'moment-timezone';

import config from './index';

moment.tz.setDefault(config.localization.timezone);

const CLIENT = path.resolve(__dirname, '../..', 'client');
const INDEX = path.resolve(__dirname, '../..', 'client', 'index.html');

/**
 * App configuration.
 *
 * @param {object} app - the app instance
 * @returns {void}
 */
export default (app) => {
  app.set('port', config.port);

  /** use ejs templates */
  // app.set('view engine', 'ejs');
  // app.set('views', CLIENT);

  /** define the folder that will be used for static assets */
  app.use(Express.static(path.resolve(CLIENT, 'assets')));

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  app.use(helmet());
  app.use(session({
    secret: config.expressSession.secret,
    name: config.expressSession.name,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  app.get('*', (req, res) => res.status(200).sendFile(INDEX));
};
