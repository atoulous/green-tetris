import store from '../store';
import actions from '../actions';

const { updateError } = actions;

export default function (data) {
  const { error } = data;
  store.dispatch(updateError(error));
}
