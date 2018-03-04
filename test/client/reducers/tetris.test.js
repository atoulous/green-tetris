import reducer, { initialState } from '../../../src/client/reducers';
import * as actions from '../../../src/client/actions/tetris';
import { _addRowToGrid } from '../../../src/client/reducers/tetris';
import { initGrid, initRow, sliceBagFromIndex } from '../../../src/client/utils/tetris';

const piece = { shape: { blocks: [3840, 8738, 240, 17476], color: 'cyan' }, direction: 0, x: 4, y: 0 };
const game = { id: '6124ad40-1f92-11e8-9106-0b3dc1db0f6e',
  masterId: 'd-vlczkWyTHtIJZvAAAB',
  speed: { label: 'Normal', value: 1000 },
  size: { label: 'Normal', value: 20 },
  maxPlayers: 5,
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

describe('toggle play true', () => {
  it('should toggle play', () => {
    expect(reducer({ ...initialState, onPause: true }, { type: 'TOGGLE_PLAY' }))
      .toEqual({ ...initialState, onPause: false });
  });
});

describe('toggle play false', () => {
  it('should toggle play', () => {
    expect(reducer({ ...initialState, onPause: false }, { type: 'TOGGLE_PLAY' }))
      .toEqual({ ...initialState, onPause: true });
  });
});

describe('set piece', () => {
  it('should set piece', () => {
    expect(reducer(initialState, actions.setPiece(piece)))
      .toEqual({ ...initialState, currentPiece: piece });
  });
});

describe('update score', () => {
  it('should update score', () => {
    expect(reducer(initialState, actions.updateScore(20)))
      .toEqual({ ...initialState, score: 20 });
  });
});

describe('add piece to queue', () => {
  it('should add piece to queue', () => {
    expect(reducer(initialState, actions.addPieceToQueue(piece)))
      .toEqual({ ...initialState, piecesQueue: [piece] });
  });
});

describe('increase speed', () => {
  it('should increase speed', () => {
    expect(reducer(initialState, actions.increaseSpeed()))
      .toEqual({ ...initialState, speed: 900 });
  });
});

describe('update spectrum', () => {
  it('should update spectrum', () => {
    expect(reducer(initialState, actions.updateSpectrum(initialState.grid)))
      .toEqual(initialState);
  });
});

describe('listen key', () => {
  it('should listen key', () => {
    expect(reducer(initialState, actions.isListeningKey()))
      .toEqual({ ...initialState, isListeningKey: true });
  });
});

describe('add row', () => {
  it('should add row', () => {
    expect(reducer({ ...initialState, game }, actions.addRow()))
      .toEqual({
        ...initialState,
        game,
        grid: _addRowToGrid(initialState.grid, 14),
        gridWithoutCurrent: _addRowToGrid(initialState.gridWithoutCurrent, 14)
      });
  });
});

describe('refresh grid without current', () => {
  it('should refresh grid without current', () => {
    expect(reducer(initialState, actions.refreshGridWithoutCurrent()))
      .toEqual({ ...initialState, gridWithoutCurrent: initialState.grid });
  });
});

describe('erase piece', () => {
  it('should erase piece', () => {
    expect(reducer({ ...initialState, currentPiece: piece }, actions.erasePiece()))
      .toEqual({ ...initialState, currentPiece: piece });
  });
});

describe('draw piece', () => {
  it('should draw piece', () => {
    const expectedGrid = initialState.grid;
    expectedGrid[4][1].fill = true;
    expectedGrid[4][1].color = 'cyan';
    expectedGrid[5][1].fill = true;
    expectedGrid[5][1].color = 'cyan';
    expectedGrid[6][1].fill = true;
    expectedGrid[6][1].color = 'cyan';
    expectedGrid[7][1].fill = true;
    expectedGrid[7][1].color = 'cyan';
    expect(reducer({ ...initialState, currentPiece: piece }, actions.drawPiece()))
      .toEqual({
        ...initialState,
        currentPiece: piece,
        grid: expectedGrid,
      });
  });
});

describe('delete rows', () => {
  it('should delete rows', () => {
    const newGrid = sliceBagFromIndex(initialState.grid, 19);
    newGrid.unshift(initRow(false, 14));
    expect(reducer({ ...initialState, game }, actions.deleteRows([19])))
      .toEqual({
        ...initialState,
        game,
        grid: newGrid
      });
  });
});

describe('set grid', () => {
  it('should set grid', () => {
    expect(reducer({ ...initialState, game }, actions.setGrid()))
      .toEqual({
        ...initialState,
        game,
        grid: initGrid(20, 14),
        gridWithoutCurrent: initGrid(20, 14),
      });
  });
});

describe('set grid null', () => {
  it('should set grid', () => {
    expect(reducer({ ...initialState, game: { size: {} } }, actions.setGrid()))
      .toEqual({
        ...initialState,
        game: { size: {} },
        grid: initGrid(20, 14),
        gridWithoutCurrent: initGrid(20, 14),
      });
  });
});

describe('set new piece null', () => {
  it('should set new piece', () => {
    expect(reducer(initialState, { type: 'SET_NEW_PIECE' }))
      .toEqual(initialState);
  });
});

describe('set new piece working', () => {
  it('should set new piece', () => {
    expect(reducer({ ...initialState, piecesQueue: [piece, piece, piece] }, { type: 'SET_NEW_PIECE' }))
      .toEqual({
        ...initialState,
        currentPiece: piece,
        piecesQueue: [piece, piece]
      });
  });
});
