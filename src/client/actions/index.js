import * as actionsConnexion from './connexion';
import * as actionsTetris from './tetris';
import * as actionsSocket from './socket';
import * as actionsGame from './game';
import * as actionsPlayer from './player';
import * as actionsError from './error';

export default {
  ...actionsTetris,
  ...actionsConnexion,
  ...actionsSocket,
  ...actionsPlayer,
  ...actionsGame,
  ...actionsError,
};
