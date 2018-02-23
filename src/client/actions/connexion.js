// Constants
export const RTC_MESSAGE = 'RTC_MESSAGE';
export const ADD_AUDIO_STREAM = 'ADD_AUDIO_STREAM';
export const TOGGLE_MUTED = 'TOGGLE_MUTED';

// Action objects
export const RTCConnectionMessage = msg => ({
  type: RTC_MESSAGE,
  data: msg,
});

export const addAudioStream = stream => ({
  type: ADD_AUDIO_STREAM,
  data: stream,
});

export const toggleMuted = muted => ({
  type: TOGGLE_MUTED,
  data: muted,
});
