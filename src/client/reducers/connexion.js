
export function rtcConnexion(state, action) {
  const conn = action.data;
  console.log('prepare to crash');
  const RTCConns = state.rtc.length > 0 ?
    [{ isListened: false, conn }, ...state.rtc] :
    [{ isListened: false, conn }];
  return { ...state, rtc: RTCConns};
}

export function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}
