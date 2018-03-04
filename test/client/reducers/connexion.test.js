import reducer, { initialState } from '../../../src/client/reducers';
import * as actions from '../../../src/client/actions/connexion';

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

const msg = {
  peer: 'zdzpmepes960f6r',
  spectrum: [15, 15, 15, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
};

describe('initialState', () => {
  it('should return initialState', () => {
    expect(reducer(initialState, {}))
      .toEqual(initialState);
  });
});

describe('toggle muted', () => {
  it('should toggle muted', () => {
    expect(reducer(initialState, actions.toggleMuted({ muted: true })))
      .toEqual({ ...initialState, muted: true });
  });
});

describe('has audio', () => {
  it('should set has audio to true', () => {
    expect(reducer(initialState, actions.hasAudio()))
      .toEqual({ ...initialState, hasAudio: true });
  });
});

describe('has called', () => {
  it('should set has called to true', () => {
    expect(reducer(initialState, actions.hasCalled()))
      .toEqual({ ...initialState, hasCalled: true });
  });
});

describe('killAudio', () => {
  it('should set has called to true', () => {
    expect(reducer(initialState, actions.killAudio()))
      .toEqual({ ...initialState, hasAudio: false, audioStreams: [] });
  });
});

describe('addAudioStream', () => {
  it('should set has called to true', () => {
    expect(reducer(initialState, actions.addAudioStream({ audio: 'oijoijoij' })))
      .toEqual({ ...initialState, audioStreams: [{ audio: 'oijoijoij' }] });
  });
});

describe('rtcMessage null', () => {
  it('should set has called to true', () => {
    expect(reducer(initialState, actions.RTCConnectionMessage({ audio: 'oijoijoij' })))
      .toEqual({ ...initialState });
  });
});

describe('rtcMessage work', () => {
  it('should set has called to true', () => {
    const expected = Object.assign({}, game);
    expected.players[1].spectrum = msg.spectrum;
    expect(reducer({ ...initialState, game }, actions.RTCConnectionMessage(JSON.stringify(msg))))
      .toEqual({ ...initialState, game: expected });
  });
});
