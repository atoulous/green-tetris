// chat-test.js
import { SocketIO, Server } from 'mock-socket';

describe('test socket', () => {
  it('basic test', (done) => {
    const mockServer = new Server('http://localhost:8080');
    mockServer.on('connection', server => {
      console.log('serve -- ', server);
      mockServer.emit('test', 'test message 1');
    });

    /*
      This step is very important! It tells our chat app to use the mocked
      websocket object instead of the native one. The great thing
      about this is that our actual code did not need to change and
      thus is agnostic to how we test it.
    */
    window.io = SocketIO;

    // Now when Chat tries to do io() or io.connect()
    // it will use MockSocketIO object
    const socketClient = new io('http://localhost:8080');
    socketClient.on('test', dat => {
      console.log('recevied data -> ', dat);
    });
    setTimeout(() => {
      mockServer.stop(done);
    }, 3000);
  });
});
