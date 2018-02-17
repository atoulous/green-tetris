/**
 * Class Player
 *
 * @param constructor {Object} - id, socket
 */
class Player {
  constructor({ webRTCId = null, socketId = null, nickname = null }) {
    if (!webRTCId || !socketId) throw new Error('webRTCId and socketId are required');
    this.socketId = socketId;
    this.webRTCId = webRTCId;
    this.nickname = nickname || 'defaultName';
  }

}

export default Player;
