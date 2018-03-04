import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../../src/client/actions/game';

describe('UPDATE_GAMES_LIST', () => {
  it('should create an action updateGamesList', () => {
    const data = [];
    const expectedAction = {
      type: actions.UPDATE_GAMES_LIST,
      gamesList: data
    };
    expect(actions.updateGamesList(data))
      .toEqual(expectedAction);
  });
});

describe('UPDATE_GAME', () => {
  it('should create an action updateGame', () => {
    const data = {};
    const expectedAction = {
      type: actions.UPDATE_GAME,
      game: data
    };
    expect(actions.updateGame(data))
      .toEqual(expectedAction);
  });
});

describe('END_GAME', () => {
  it('should create an action endGame', () => {
    const data = true;
    const expectedAction = {
      type: actions.END_GAME,
      data
    };
    expect(actions.endGame(data))
      .toEqual(expectedAction);
  });
});

describe('RESTART_GAME', () => {
  it('should create an action restartGame', () => {
    const expectedAction = {
      type: actions.RESTART_GAME,
    };
    expect(actions.restartGame())
      .toEqual(expectedAction);
  });
});

describe('LOCATION', () => {
  it('should create an action changeLocation', () => {
    const data = '/';
    const expectedAction = {
      type: actions.LOCATION,
      data
    };
    expect(actions.changeLocation(data))
      .toEqual(expectedAction);
  });
});

it('should execute fetch data', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({});

  fetchMock
    .getOnce('/api/games', { body: [{ gameId: 'oijoijoij' }, { gameId: 'oijoijoij2' }], headers: { 'content-type': 'application/json' } });
  return store.dispatch(actions.getAllGames())
    .then(() => {
      const act = store.getActions();
      const expectedAction = {
        type: actions.UPDATE_GAMES_LIST,
        gamesList: [{ gameId: 'oijoijoij' }, { gameId: 'oijoijoij2' }],
      };
      expect(act[0]).toEqual(expectedAction);
    });
});
