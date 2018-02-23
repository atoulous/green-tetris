
export function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}

export function addAudioStream(state, action) {
  const { audioStreams } = state;
  console.log('all streams are -- ', [...audioStreams, action.data]);
  return { ...state, audioStreams: [...audioStreams, action.data] };
}

export function toggleMuted(state, action) {
  return { ...state, muted: action.data.muted };
}
