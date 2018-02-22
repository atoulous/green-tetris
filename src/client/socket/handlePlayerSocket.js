import store from '../store';
import actions from '../actions';

const { updatePlayerId } = actions;


function updateId(data) {
  const { id } = data;
  store.dispatch(updatePlayerId(id));
}

export default function (data) {
  const { path } = data;
  console.log(`socket /game${path}`);
  switch (path) {
    case '/updateId': {
      updateId(data);
      break;
    }
    default: {
      console.log('default triggered');
    }
  }
}
