export const RTC_CONN = 'RTC_CONN';
export const RTC_MESSAGE = 'RTC_MESSAGE';

export const RTCConnection = (conn) => ({
  type: RTC_CONN,
  data: conn,
});

export const RTCConnectionMessage = (msg) => ({
  type: RTC_MESSAGE,
  data: msg,
});

export default RTCConnection;
