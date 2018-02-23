export function rtcConnexion(state, action) {
  const conn = action.data;
  const { RTCConns } = state;
  RTCConns.push({ conn });
  return { ...state, RTCConns };
}

export function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}
