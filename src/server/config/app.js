import Express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import moment from 'moment-timezone';
import helmet from 'helmet';
import path from 'path';

import config from './index';

moment.tz.setDefault(config.localization.timezone);

const CLIENT = path.resolve(__dirname, '../..', 'client');

/**
 * App configuration.
 *
 * @param {object} app - the app instance
 * @returns {void}
 */
export default (app) => {
  app.set('port', config.port);

  /** define client folder as static */
  app.use(Express.static(path.resolve(CLIENT)));

  /** middlewares */
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

};
