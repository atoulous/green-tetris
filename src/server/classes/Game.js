class Game {
  constructor({ room }) {
    this._room = room;
    this._players = [];
  }
  get room() {
    return this._room;
  }
  set room(room) {
    this._room = room;
  }
  get players() {
    return this._players;
  }
  set players(players) {
    this._players = players;
  }
  broadcast(io, subject, data) {
    this.players.forEach((player) => {
      console.log('sending msg to player --', player.socket, subject, data);
      io.to(player.socket).emit(subject, data);
      io.to(player.socket).emit('game', 'oooo');
    });
  }
}

export default Game;
