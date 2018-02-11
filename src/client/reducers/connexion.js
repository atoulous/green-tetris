
export function rtcConnexion(state, action) {
  const conn = action.data;
  console.log('new conn received --', conn);
  return { ...state };
}

export function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}
