import { connexion as initialState } from './init';
import { RTC_CONN, RTC_MESSAGE} from '../actions/connexion';

function rtcConnexion(state, action) {
  const conn = action.data;
  const RTCConns = state.rtc.length > 0 ?
    [{ isListened: false, conn }, ...state.rtc] :
    [{ isListened: false, conn }];
  return { ...state, rtc: RTCConns};
}

function rtcMessage(state) {
  console.log('successfully triggered action message --');
  return state;
}

const connexion = (state = initialState, action) => {
  switch (action.type) {
    case RTC_CONN:
      return rtcConnexion(state, action);
    case RTC_MESSAGE:
      return rtcMessage(state);
    default:
      return state;
  }
};

export default connexion;
