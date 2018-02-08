import { params } from '../constants';

export default const RTCConnMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type === 'RTC_CONN') {
    let channel = action.data;
    channel.on('data', (data) => {
      dispatch(RTCConnectionMessageAction(data));
    })
  }
  return next(action);
};