import * as actionsConnexion from './connexion';
import * as actionsTetris from './tetris';
import * as actionsSocket from './socket';

export default { ...actionsTetris, ...actionsConnexion, ...actionsSocket };
