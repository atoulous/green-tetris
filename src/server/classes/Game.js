/**
 * Class Game
 *
 * @param constructor {Object} - room
 */
class Game {
  constructor({ room = null, gameMaster = null }) {
    if (!room || !gameMaster) throw new Error('room and gameMaster are required');

    this.room = room;
    this.players = [];
    this.hasStarted = false;
    this.settings = {};
    this.gameMaster = gameMaster;
  }

  broadcast(io, subject, data) {
    this.players.forEach((player) => {
      io.to(player.socketId).emit(subject, data);
    });
  }

  start() {
    this.hasStarted = true;
  }

}

export default Game;
