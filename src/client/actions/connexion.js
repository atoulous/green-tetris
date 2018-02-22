// Constants
export const RTC_MESSAGE = 'RTC_MESSAGE';
export const ADD_AUDIO_STREAM = 'ADD_AUDIO_STREAM';

// Action objects
export const RTCConnectionMessage = msg => ({
  type: RTC_MESSAGE,
  data: msg,
});

export const addAudioStream = stream => ({
  type: ADD_AUDIO_STREAM,
  data: stream,
});
