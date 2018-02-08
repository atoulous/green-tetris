export const RTC_CONN = 'RTC_CONN';
export const RTC_MESSAGE = 'RTC_MESSAGE';

const RTCConnection = (state = [], action) => {
  switch (action.type) {
    case RTC_CONN:
      const conn = action.data;
      const RTCConns = state.length > 0 ? [{ isListened: false, conn }, ...state] : [{ isListened: false, conn }];
      return (RTCConns);
    case RTC_MESSAGE:
      console.log('successfully triggered action message --', action);
      return state;
    default:
      return state
  }
};

export default RTCConnection;
