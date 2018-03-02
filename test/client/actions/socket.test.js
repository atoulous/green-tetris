import * as actions from '../../../src/client/actions/socket.js';

describe('socketRestartGame', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/restart', gameId }
                }
          expect(actions.socketRestartGame(gameId))
            .toEqual(expectedAction)
        })
})

describe('socketEndGame', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/end', gameId }
                }
          expect(actions.socketEndGame(gameId))
            .toEqual(expectedAction)
        })
})

describe('socketCreateGame', () => {
    it('should create an action socket', () => {
          const settings = { speed: 'fast' };
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/create', settings }
                }
          expect(actions.socketCreateGame(settings))
            .toEqual(expectedAction)
        })
})

describe('socketJoinGame', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/join', gameId }
                }
          expect(actions.socketJoinGame(gameId))
            .toEqual(expectedAction)
        })
})

describe('socketLeaveGame', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/leave', gameId }
                }
          expect(actions.socketLeaveGame(gameId))
            .toEqual(expectedAction)
        })
})

describe('socketStartGame', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/start', gameId }
                }
          expect(actions.socketStartGame(gameId))
            .toEqual(expectedAction)
        })
})

describe('socketLineCompleted', () => {
    it('should create an action socket', () => {
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/line' }
                }
          expect(actions.socketLineCompleted())
            .toEqual(expectedAction)
        })
})

describe('socketUpdateGame', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const settings = { speed: 'fast' };
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/game', path: '/update', gameId, settings }
                }
          expect(actions.socketUpdateGame(gameId, settings))
            .toEqual(expectedAction)
        })
})

describe('socketUpdatePlayer', () => {
    it('should create an action socket', () => {
          const settings = {nickname: 'thibault'};
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/player', path: '/update', settings }
                }
          expect(actions.socketUpdatePlayer(settings))
            .toEqual(expectedAction)
        })
})

describe('socketKickPlayer', () => {
    it('should create an action socket', () => {
          const playerIdToDelete = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/player', path: '/kick', playerIdToDelete }
                }
          expect(actions.socketKickPlayer(playerIdToDelete))
            .toEqual(expectedAction)
        })
})

describe('newPiece', () => {
    it('should create an action socket', () => {
          const gameId = 'oijoijoij';
          const expectedAction = {
                  type: 'socket',
                  data: { call: '/piece', path: '/new', gameId }
                }
          expect(actions.newPiece({ gameId }))
            .toEqual(expectedAction)
        })
})

