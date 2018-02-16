/**
 * Class Player
 *
 * @param constructor {Object} - id, socket
 */
class Player {
  constructor({ webRTCId, socketId }) {
    this._socketId = socketId;
    this._webRTCId = webRTCId;
    this._nickname = 'defaultName';
  }

  get socketId() {
    return this._socketId;
  }

  set socketId(socketId) {
    this._socketId = socketId;
  }

  get webRTCId() {
    return this._webRTCId;
  }

  set webRTCId(webRTCId) {
    this._webRTCId = webRTCId;
  }

  get nickname() {
    return this._nickname;
  }

  set nickname(nickname) {
    this._nickname = nickname;
  }
}

export default Player;
