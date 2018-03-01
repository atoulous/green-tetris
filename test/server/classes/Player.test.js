import Player from '../../../src/server/classes/Player';
import Game from '../../../src/server/classes/Game';
import MockSocket from './MockSocket';

describe('classes/player', () => {
  let player;

  it('should fail to create player instance', async () => {
    function failPlayerCreation() {
      return new Player();
    }
    expect(failPlayerCreation).toThrowError(/required/);
  });

  it('should success to create player instance', async () => {
    player = new Player(new MockSocket());
    expect(player).not.toBeUndefined();
    expect(player.getPayload()).toHaveProperty('nickname', 'default');
    expect(player.getPayload()).toHaveProperty('webRTCId', 'default');
    expect(player.getPayload()).toHaveProperty('isReady', false);
    expect(player.getPayload()).toHaveProperty('hasWon', null);
    expect(player.getPayload()).toHaveProperty('score', 0);
    expect(player.getPayload()).toHaveProperty('gameId', null);
  });

  it('should change player nickname', async () => {
    player = new Player(new MockSocket());
    player.set('nickname', 'thibault');
    expect(player.getPayload()).toHaveProperty('nickname', 'thibault');
  });

  it('should update player', async () => {
    player = new Player(new MockSocket());
    player.update({ nickname: 'thibault' });
    expect(player.getPayload()).toHaveProperty('nickname', 'thibault');
  });

  it('should set gameId of player on creation', async () => {
    player = new Player(new MockSocket());
    const game = new Game(player.get('id'));
    expect(player.getPayload()).toHaveProperty('gameId', game.get('id'));
  });
});
