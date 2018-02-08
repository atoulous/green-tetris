import { ALERT_POP } from '../actions/alert'

const reducer = (state = 'default Message', action) => {
  switch (action.type) {
  case ALERT_POP:
    return { message: action.message };
  default:
    return state
  }
};

export default reducer
