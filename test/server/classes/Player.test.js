import Player from '../../../src/server/classes/Player';

describe('classes/player', () => {
  let player;

  beforeAll(() => {
    player = new Player({ socketId: 'socketId', webRTCId: 'webRTCId', nickname: 'Player' });
  });

  it('should success to create player instance', async () => {
    expect(player).not.toBeUndefined();
    expect(player).toHaveProperty('nickname', 'Player');
  });

  it('should fail to create player instance', async () => {
    function failPlayerCreation() {
      return new Player({ no: true });
    }
    expect(failPlayerCreation).toThrowError(/required/);
  });

  it('should change player nickname', async () => {
    player.nickname = 'thibault';
    expect(player).toHaveProperty('nickname', 'thibault');
  });

  it('should change player socketId', async () => {
    player.socketId = 'thibault';
    expect(player).toHaveProperty('socketId', 'thibault');
  });

  it('should change player webRTCId', async () => {
    player.webRTCId = 'thibault';
    expect(player).toHaveProperty('webRTCId', 'thibault');
  });
});
