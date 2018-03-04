import reducer, { initialState } from '../../../src/client/reducers';
import * as actions from '../../../src/client/actions/game';

import { initSpectrum } from '../../../src/client/utils/tetris';

const game = { id: '6124ad40-1f92-11e8-9106-0b3dc1db0f6e',
  masterId: 'd-vlczkWyTHtIJZvAAAB',
  speed: { label: 'Normal', value: 1000 },
  size: { label: 'Normal', value: 20 },
  maxPlayers: 5,
  isSolo: false,
  hasStarted: true,
  players:
    [
      { id: 'd-vlczkWyTHtIJZvAAAB',
        nickname: 'Player',
        isReady: true,
        hasWon: null,
        gameId: '6124ad40-1f92-11e8-9106-0b3dc1db0f6e',
        webRTCId: 't0w4i3jzsoy4aemi',
        score: 0 },
      { id: '1vgINWcGb6Me9XlDAAAC',
        nickname: 'Player',
        isReady: true,
        hasWon: null,
        gameId: '6124ad40-1f92-11e8-9106-0b3dc1db0f6e',
        webRTCId: 'zdzpmepes960f6r',
        score: 0,
        spectrum: []
      }],
  firstPiece: null
};

describe('end game', () => {
  it('should end game', () => {
    expect(reducer(initialState, actions.endGame(true)))
      .toEqual({ ...initialState, hasWon: true, onPause: true });
  });
});

describe('change location', () => {
  it('should change location', () => {
    expect(reducer(initialState, actions.changeLocation('/games')))
      .toEqual({ ...initialState, location: '/games' });
  });
});

describe('update game list', () => {
  it('should update game list', () => {
    expect(reducer(initialState, actions.updateGamesList(['oijoijoij', 'oijoijoij2'])))
      .toEqual({ ...initialState, gamesList: ['oijoijoij', 'oijoijoij2'] });
  });
});

describe('restart game', () => {
  it('should restart game', () => {
    expect(reducer({ ...initialState, game }, actions.restartGame()))
      .toEqual({ ...initialState,
        game: {
          ...game,
          hasStarted: false,
          players: game.players.map(
            player => ({ ...player, spectrum: initSpectrum(20, 14), isReady: false }))
        },
      });
  });
});

describe('update game', () => {
  it('should update game', () => {
    const gameUpdated = {
      id: '0e1bca40-1fa4-11e8-926e-d3d15931560f',
      masterId: 's9xDOmS_QsP_DKYrAAAA',
      speed: { label: 'Fast', value: 700 },
      size: { label: 'Normal', value: 20 },
      maxPlayers: 5,
      hasStarted: true,
      players: [
        {
          id: 'd-vlczkWyTHtIJZvAAAB',
          nickname: 'Player',
          isReady: true,
          hasWon: null,
          gameId: '6124ad40-1f92-11e8-9106-0b3dc1db0f6e',
          webRTCId: 't0w4i3jzsoy4aemi',
          score: 0,
          spectrum: []
        },
        {
          id: '1vgINWcGb6Me9XlDAAAC',
          nickname: 'Player',
          isReady: true,
          hasWon: null,
          gameId: '6124ad40-1f92-11e8-9106-0b3dc1db0f6e',
          webRTCId: 'zdzpmepes960f6r',
          score: 0,
          spectrum: []
        }
      ],
    };

    expect(reducer({ ...initialState, game }, actions.updateGame(gameUpdated)))
      .toEqual({ ...initialState, game: gameUpdated });
  });
});
