import Game from '../../../src/server/classes/Game';
import Player from '../../../src/server/classes/Player';

describe('classes/game', () => {
  let game;
  const gameMaster = new Player({ nickname: 'gameMaster', socketId: 'socketId', webRTCId: 'webRTCId' });

  beforeAll(() => {
    game = new Game({ room: 'defaultRoom', gameMaster });
  });
  it('should success to create game instance', async () => {
    expect(game).not.toBeUndefined();
    expect(game).toHaveProperty('hasStarted', false);
    expect(game).toHaveProperty('room', 'defaultRoom');
    expect(game.gameMaster).toBeInstanceOf(Player);
  });

  it('should fail to create game instance', async () => {
    function failGameCreation() {
      return new Game({ no: true });
    }
    expect(failGameCreation).toThrowError(/required/);
  });

  it('should start game', async () => {
    game.start();
    expect(game.hasStarted).toBe(true);
  });

  it('should return formatted data of game', async () => {
    const formattedData = game.formatData(['hasStarted', 'gameMaster']);
    expect(formattedData).toHaveProperty('hasStarted');
    expect(formattedData).toHaveProperty('gameMaster', gameMaster);
    expect(formattedData).not.toHaveProperty('room');
  });
});
