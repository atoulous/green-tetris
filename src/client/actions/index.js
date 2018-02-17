import * as actionsConnexion from './connexion';
import * as actionsTetris from './tetris';
import * as actionsSocket from './socket';
import * as actionsGame from './game';

export default {
  ...actionsTetris,
  ...actionsConnexion,
  ...actionsSocket,
  ...actionsGame
};
