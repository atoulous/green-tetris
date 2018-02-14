class Game {
  constructor({ room, }) {
    this._room = room;
    this._players = [];
    this._hasStarted = false;
    this._settings = {};
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

  broadcast(io, subject, data) {
    this.players.forEach((player) => {
      io.to(player.socket).emit(subject, data);
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
