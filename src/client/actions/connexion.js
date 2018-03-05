// Constants
export const RTC_MESSAGE = 'RTC_MESSAGE';
export const ADD_AUDIO_STREAM = 'ADD_AUDIO_STREAM';
export const TOGGLE_MUTED = 'TOGGLE_MUTED';
export const INIT_AUDIO_STREAM = 'INIT_AUDIO_STREAM';
export const HAS_CALLED = 'HAS_CALLED';
export const KILL_AUDIO = 'KILL_AUDIO';

// Action objects
export const RTCConnectionMessage = msg => ({
  type: RTC_MESSAGE,
  data: msg,
});

export const addAudioStream = stream => ({
  type: ADD_AUDIO_STREAM,
  data: stream,
});

export const hasAudio = () => ({
  type: INIT_AUDIO_STREAM,
});

export const hasCalled = () => ({
  type: HAS_CALLED,
});

export const toggleMuted = muted => ({
  type: TOGGLE_MUTED,
  data: muted,
});

export const killAudio = () => ({
  type: KILL_AUDIO,
});
