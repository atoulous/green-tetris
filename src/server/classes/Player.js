
class Player {
  constructor({ id, socket }) {
    this._socket = socket;
    this._id = id;
    this._nickname = 'defaultName';
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
}

export default Player;
