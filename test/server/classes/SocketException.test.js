import SocketException from '../../../src/server/classes/SocketException';
import Player from '../../../src/server/classes/Player';
import MockSocket from './MockSocket';


describe('/classes/SocketException', () => {
  it('should create a SocketException instance without disconnect flag', () => {
    const s = new SocketException('this is a test');

    expect(s).toHaveProperty('message', 'this is a test');
    expect(s).toHaveProperty('shallDisconnect', false);
    expect(s).toHaveProperty('socketId', null);
  });

  it('should create a SocketException instance with disconnect flag', () => {
    const s = new SocketException('this is a test', true);

    expect(s).toHaveProperty('message', 'this is a test');
    expect(s).toHaveProperty('shallDisconnect', true);
    expect(s).toHaveProperty('socketId', null);
  });

  it('should disconnect player', () => {
    const s = new SocketException('this is a test', true);
    const player = new Player(new MockSocket());
    s.socketId = player.get('id');
    s.respond();
  });
});
