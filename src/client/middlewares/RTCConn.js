import { RTCConnectionMessage } from '../actions/connexion';

export default ({ dispatch }) => next => (action) => {
  if (action.type === 'RTC_CONN') {
    const channel = action.data;
    channel.on('data', (data) => {
      dispatch(RTCConnectionMessage(data));
    });
  }
  return next(action);
};
