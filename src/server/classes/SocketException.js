import { getConnection } from '../webSocket/socketManager';
import Player from './Player';
/**
 * Custom Error for sockets.
 */
export default class SocketException {
  constructor(message, shallDisconnect = false) {
    this.message = message;
    this.shallDisconnect = shallDisconnect;
    this.socketId = null;
  }

  broadcast() {
    const io = getConnection();
    const data = {
      error: { message: this.message },
    };
    if (io) io.to(this.socketId).emit('/error', data);
  }

  disconnect() {
    const player = Player.getPlayerById(this.socketId);
    if (player) player.get('socket').disconnect();
  }

  respond() {
    if (this.socketId) this.broadcast();
    if (this.socketId && this.shallDisconnect) this.disconnect();
  }
}
