import * as actionsConnexion from './connexion';
import * as actionsTetris from './tetris';
import * as actionsGame from './game';

export default { ...actionsTetris, ...actionsConnexion, ...actionsGame };
