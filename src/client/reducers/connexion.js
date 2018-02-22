
export function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}

export function addAudioStream(state, action) {
  const { audioStreams } = state;
  return { ...state, audioStreams: [...audioStreams, action.data] };
}
