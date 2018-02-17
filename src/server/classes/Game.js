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

  /*
  get gameMaster() {
    return this._gameMaster;
  }

  set gameMaster(gameMaster) {
    this._gameMaster = gameMaster;
  }

  get settings() {
    return this._settings;
  }

  set settings(settings) {
    this._settings = settings;
  }

  get room() {
    return this._room;
  }

  set room(room) {
    this._room = room;
  }

  get hasStarted() {
    return this._hasStarted;
  }

  set hasStarted(hasStarted) {
    this._hasStarted = hasStarted;
  }

  get players() {
    return this._players;
  }

  set players(players) {
    this._players = players;
  }
  */

  broadcast(io, subject, data) {
    this.players.forEach((player) => {
      io.to(player.socketId).emit(subject, data);
    });
  }

  start() {
    this.hasStarted = true;
  }

  formatData(keys) {
    const formattedData = {};

    keys.forEach((key) => {
      formattedData[key] = this[key];
    });
    return formattedData;
  }
}

export default Game;
