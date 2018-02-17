import * as actionsConnexion from './connexion';
import * as actionsTetris from './tetris';
import * as actionsSocket from './socket';
import * as actionsPlayer from './player';

export default {
  ...actionsTetris,
  ...actionsConnexion,
  ...actionsSocket,
  ...actionsPlayer
};
