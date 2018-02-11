
export function rtcConnexion(state, action) {
  const conn = action.data;
  let { RTCConns } = state;
  RTCConns.push({ conn });
  return { ...state, RTCConns };
}

export function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}
