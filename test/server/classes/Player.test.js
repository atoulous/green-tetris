import Player from '../../../src/server/classes/Player';

describe('classes/player', () => {

  let player;

  beforeAll(() => {
    player = new Player({socket: 'socketId' });
  });
  it('should create player instance', async () => {
    console.log('play -- ', player);

    expect(player).not.toBeUndefined();
    expect(player).toHaveProperty('nickname', 'defaultName');
  });

  it('should change player nickname', async () => {
    player.nickname = 'thibault';
    expect(player).toHaveProperty('nickname', 'thibault');
  });

});
