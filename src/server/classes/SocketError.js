import { io } from '../webSocket/socketManager';
/**
 * Custom Error for sockets.
 */
export class SocketError extends Error {
  constructor(name, call, ...params) {
    super(params);
    this.call = call;
    this.name = name;
    this.socketId = null;

    // Maintenir dans la pile une trace adéquate de l'endroit où l'erreur a été déclenchée.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SocketError);
    }
  }

  broadcast() {
    const data = {
      path: '/error',
      message: this.message,
    };
    io.to(this.socketId).emit(this.call, data);
  }
}

/**
 * Custom SocketError for Game
 */
export class SocketErrorGame extends SocketError {
  constructor(message) {
    super('SocketErrorGame', '/game', message);
  }
}


/**
 * Custom SocketError for Player
 */
export class SocketErrorPlayer extends SocketError {
  constructor(message) {
    super('SocketErrorPlayer', '/player', message);
  }
}
