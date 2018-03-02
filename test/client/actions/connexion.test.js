import * as actions from '../../../src/client/actions/connexion.js';

describe('RTC_MESSAGE', () => {
    it('should create an action rtcMessage', () => {
          const msg = 'thibault';
          const expectedAction = {
                  type: actions.RTC_MESSAGE,
                  data: msg
                }
          expect(actions.RTCConnectionMessage(msg))
            .toEqual(expectedAction)
        })
})

describe('ADD_AUDIO_STREAM', () => {
    it('should create an action addAudioStream', () => {
          const msg = 'thibault';
          const expectedAction = {
                  type: actions.ADD_AUDIO_STREAM,
                  data: msg
                }
          expect(actions.addAudioStream(msg))
            .toEqual(expectedAction)
        })
})

describe('INIT_AUDIO_STREAM', () => {
    it('should create an action hasAudio', () => {
          const expectedAction = {
                  type: actions.INIT_AUDIO_STREAM,
                }
          expect(actions.hasAudio())
            .toEqual(expectedAction)
        })
})

describe('HAS_CALLED', () => {
    it('should create an action hasCalled', () => {
          const expectedAction = {
                  type: actions.HAS_CALLED,
                }
          expect(actions.hasCalled())
            .toEqual(expectedAction)
        })
})

describe('TOGGLE_MUTED', () => {
    it('should create an action toggleMuted', () => {
          const muted = true;
          const expectedAction = {
                  type: actions.TOGGLE_MUTED,
                  data: muted
                }
          expect(actions.toggleMuted(muted))
            .toEqual(expectedAction)
        })
})

describe('KILL_AUDIO', () => {
    it('should create an action killAudio', () => {
          const expectedAction = {
                  type: actions.KILL_AUDIO,
                }
          expect(actions.killAudio())
            .toEqual(expectedAction)
        })
})
