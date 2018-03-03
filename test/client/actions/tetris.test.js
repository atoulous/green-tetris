import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/client/actions/tetris';
import { initialState } from '../../../src/client/reducers';
import Game from '../../../src/server/classes/Game';

describe('refreshGridWithoutCurrent', () => {
  it('should create an action tetris', () => {
    const expectedAction = {
      type: actions.REFRESH_GRID_WITHOUT_CURRENT,
    };
    expect(actions.refreshGridWithoutCurrent())
      .toEqual(expectedAction);
  });
});

describe('increaseSpeed', () => {
  it('should create an action tetris', () => {
    const expectedAction = {
      type: actions.INCREASE_SPEED,
    };
    expect(actions.increaseSpeed())
      .toEqual(expectedAction);
  });
});

describe('drawPiece', () => {
  it('should create an action tetris', () => {
    const expectedAction = {
      type: actions.DRAW_PIECE,
    };
    expect(actions.drawPiece())
      .toEqual(expectedAction);
  });
});


describe('erasePiece', () => {
  it('should create an action tetris', () => {
    const expectedAction = {
      type: actions.ERASE_PIECE,
    };
    expect(actions.erasePiece())
      .toEqual(expectedAction);
  });
});


describe('addRow', () => {
  it('should create an action tetris', () => {
    const expectedAction = {
      type: actions.ADD_ROW,
    };
    expect(actions.addRow())
      .toEqual(expectedAction);
  });
});

describe('setGrid', () => {
  it('should create an action tetris', () => {
    const expectedAction = {
      type: actions.SET_GRID,
    };
    expect(actions.setGrid())
      .toEqual(expectedAction);
  });
});

describe('setPiece', () => {
  it('should create an action tetris', () => {
    const piece = {};
    const expectedAction = {
      type: actions.SET_PIECE,
      piece
    };
    expect(actions.setPiece(piece))
      .toEqual(expectedAction);
  });
});

describe('deleteRows', () => {
  it('should create an action tetris', () => {
    const rowsToDelete = [1, 2, 3];
    const expectedAction = {
      type: actions.DELETE_ROWS,
      rowsToDelete
    };
    expect(actions.deleteRows(rowsToDelete))
      .toEqual(expectedAction);
  });
});

describe('updateScore', () => {
  it('should create an action tetris', () => {
    const score = 34;
    const expectedAction = {
      type: actions.UPDATE_SCORE,
      score
    };
    expect(actions.updateScore(score))
      .toEqual(expectedAction);
  });
});

describe('updateSpectrum', () => {
  it('should create an action tetris', () => {
    const grid = [];
    const expectedAction = {
      type: actions.UPDATE_SPECTRUM,
      grid
    };
    expect(actions.updateSpectrum(grid))
      .toEqual(expectedAction);
  });
});

describe('addPieceToQueue', () => {
  it('should create an action tetris', () => {
    const newPiece = {};
    const expectedAction = {
      type: actions.ADD_PIECE_TO_QUEUE,
      newPiece
    };
    expect(actions.addPieceToQueue(newPiece))
      .toEqual(expectedAction);
  });
});

describe('setNewPiece', () => {
  it('should create an action setNewPiece', () => {
    const game = {
      id: 'oijoijoij',
      masterId: 'oijoijoij',
      speed: {
        label: 'Normal',
        value: 1000
      },
      size: {
        label: 'Normal',
        value: 20
      },
      maxPlayers: 5,
      hasStarted: true,
      players: [],
      firstPiece: {
        shape: { blocks: [17504, 3712, 50240, 11776], color: 'orange' }, direction: 0, x: 0, y: 0
      }
    };
    const expectedAction = [
      { type: actions.SET_NEW_PIECE },
      { type: actions.REFRESH_GRID_WITHOUT_CURRENT },
      {
        type: 'socket',
        data: { call: '/piece', path: '/new', gameId: game.id },
      },
      {
        type: 'socket',
        data: { call: '/game', path: '/end', gameId: game.id },
      }

    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, game });
    store.dispatch(actions.setNewPiece());
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});

describe('dropPiece', () => {
  it('should create an action dropPiece', () => {
    const expectedAction = [];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, onPause: true });
    store.dispatch(actions.dropPiece());
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});

describe('togglePlay', () => {
  it('should create an action togglePlay', () => {
    const expectedAction = [
      { type: actions.TOGGLE_PLAY }
    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, onPause: true });
    store.dispatch(actions.togglePlay());
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});

describe('movePieceLeft', () => {
  it('should create an action movePieceLeft', () => {
    const curPiece = { shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, direction: 0, x: 4, y: 0 };
    const getNextPiece = currentPiece => ({ ...currentPiece, ...{ y: currentPiece.y - 1 } });
    const nextPiece = getNextPiece(curPiece);
    const expectedAction = [
      { type: actions.ERASE_PIECE },
      { type: actions.SET_PIECE, piece: nextPiece },
      { type: actions.DRAW_PIECE },
    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, currentPiece: curPiece });
    store.dispatch(actions.move({ keyCode: 37 }));
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});

describe('movePieceRight', () => {
  it('should create an action movePieceRight', () => {
    const curPiece = { shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, direction: 0, x: 4, y: 0 };
    const getNextPiece = currentPiece => ({ ...currentPiece, ...{ y: currentPiece.y + 1 } });
    const nextPiece = getNextPiece(curPiece);
    const expectedAction = [
      { type: actions.ERASE_PIECE },
      { type: actions.SET_PIECE, piece: nextPiece },
      { type: actions.DRAW_PIECE },
    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, currentPiece: curPiece });
    store.dispatch(actions.move({ keyCode: 39 }));
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});

describe('rotatePiece', () => {
  it('should create an action rotatePiece', () => {
    const curPiece = { shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, direction: 0, x: 4, y: 0 };
    const getNextPiece = currentPiece => ({ ...currentPiece, ...{ direction: currentPiece.direction === 3 ? 0 : currentPiece.direction + 1 } });
    const nextPiece = getNextPiece(curPiece);
    const expectedAction = [
      { type: actions.ERASE_PIECE },
      { type: actions.SET_PIECE, piece: nextPiece },
      { type: actions.DRAW_PIECE },
    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, currentPiece: curPiece });
    store.dispatch(actions.move({ keyCode: 38 }));
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});

describe('movePieveDown', () => {
  it('should create an action movePieveDown', () => {
    const curPiece = { shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, direction: 0, x: 4, y: 0 };
    const getNextPiece = currentPiece => ({ ...currentPiece, ...{ x: currentPiece.x + 1 } });
    const nextPiece = getNextPiece(curPiece);
    const expectedAction = [
      { type: actions.ERASE_PIECE },
      { type: actions.SET_PIECE, piece: nextPiece },
      { type: actions.DRAW_PIECE },
    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, currentPiece: curPiece });
    store.dispatch(actions.move({ keyCode: 40 }));
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});


describe('stickPieceDown', () => {
  it('should create an action stickPieceDown', () => {
    const curPiece = { shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, direction: 0, x: 4, y: 0 };
    const expectedAction = [
      { type: actions.ERASE_PIECE },
      { type: actions.SET_PIECE, piece: { direction: 0, shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, x: 16, y: 0 }, },
      { type: actions.DRAW_PIECE },
    ];
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ ...initialState, currentPiece: curPiece });
    store.dispatch(actions.move({ keyCode: 32 }));
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});
