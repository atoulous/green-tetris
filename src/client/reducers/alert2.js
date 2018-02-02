import { ALERT_POP } from '../actions/alert';

export default (state = {}, action) => {
  switch (action.type) {
    case ALERT_POP:
      return { message: action.message };
    default:
      return state;
  }
};
