// Constants
export const RTC_MESSAGE = 'RTC_MESSAGE';

// Action objects
export const RTCConnectionMessage = msg => ({
  type: RTC_MESSAGE,
  data: msg,
});

