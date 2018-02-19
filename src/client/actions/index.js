import * as actionsConnexion from './connexion';
import * as actionsTetris from './tetris';
import * as actionsSocket from './socket';
import * as actionsGame from './game';
import * as actionPlayer from './player';

export default {
  ...actionsTetris,
  ...actionsConnexion,
  ...actionsSocket,
  ...actionPlayer,
  ...actionsGame,
};
