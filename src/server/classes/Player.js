
class Player {
  constructor({ id, socket }) {
    this._socket = socket;
    this._id = id;
    this._nickname = this.getRandomNickname();
  }
  get socket() {
    return this._socket;
  }
  set socket(socket) {
    this._socket = socket;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }
  get nickname() {
    return this._nickname;
  }
  set nickname(nickname) {
    this._nickname = nickname;
  }
  static async getRandomNickname() {
    return ('thibault');
  }
}

export default Player;
