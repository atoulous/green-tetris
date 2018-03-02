import * as actions from '../../../src/client/actions/tetris.js';

describe('refreshGridWithoutCurrent', () => {
    it('should create an action tetris', () => {
          const expectedAction = {
                  type: actions.REFRESH_GRID_WITHOUT_CURRENT,
                }
          expect(actions.refreshGridWithoutCurrent())
            .toEqual(expectedAction)
        })
})

describe('increaseSpeed', () => {
    it('should create an action tetris', () => {
          const expectedAction = {
                  type: actions.INCREASE_SPEED,
                }
          expect(actions.increaseSpeed())
            .toEqual(expectedAction)
        })
})

describe('drawPiece', () => {
    it('should create an action tetris', () => {
          const expectedAction = {
                  type: actions.DRAW_PIECE,
                }
          expect(actions.drawPiece())
            .toEqual(expectedAction)
        })
})


describe('erasePiece', () => {
    it('should create an action tetris', () => {
          const expectedAction = {
                  type: actions.ERASE_PIECE,
                }
          expect(actions.erasePiece())
            .toEqual(expectedAction)
        })
})


describe('addRow', () => {
    it('should create an action tetris', () => {
          const expectedAction = {
                  type: actions.ADD_ROW,
                }
          expect(actions.addRow())
            .toEqual(expectedAction)
        })
})

describe('setGrid', () => {
    it('should create an action tetris', () => {
          const expectedAction = {
                  type: actions.SET_GRID,
                }
          expect(actions.setGrid())
            .toEqual(expectedAction)
        })
})

describe('setPiece', () => {
    it('should create an action tetris', () => {
          const piece = {};
          const expectedAction = {
                  type: actions.SET_PIECE,
                  piece
                }
          expect(actions.setPiece(piece))
            .toEqual(expectedAction)
        })
})

describe('deleteRows', () => {
    it('should create an action tetris', () => {
          const rowsToDelete = [1, 2, 3];
          const expectedAction = {
                  type: actions.DELETE_ROWS,
                  rowsToDelete
                }
          expect(actions.deleteRows(rowsToDelete))
            .toEqual(expectedAction)
        })
})

describe('updateScore', () => {
    it('should create an action tetris', () => {
          const score = 34;
          const expectedAction = {
                  type: actions.UPDATE_SCORE,
                  score
                }
          expect(actions.updateScore(score))
            .toEqual(expectedAction)
        })
})

describe('updateSpectrum', () => {
    it('should create an action tetris', () => {
          const grid = [];
          const expectedAction = {
                  type: actions.UPDATE_SPECTRUM,
                  grid
                }
          expect(actions.updateSpectrum(grid))
            .toEqual(expectedAction)
        })
})

describe('addPieceToQueue', () => {
    it('should create an action tetris', () => {
          const newPiece = {};
          const expectedAction = {
                  type: actions.ADD_PIECE_TO_QUEUE,
                  newPiece
                }
          expect(actions.addPieceToQueue(newPiece))
            .toEqual(expectedAction)
        })
})

