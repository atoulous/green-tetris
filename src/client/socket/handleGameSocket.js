import store from '../store';
import actions from '../actions';

const { updateGame } = actions;


function update(data) {
  const { game } = data;
  store.dispatch(updateGame(game));
}

export default function (data) {
  const { path } = data;
  console.log(`socket /game${path}`);
  switch (path) {
    case '/update': {
      update(data);
      break;
    }
    default: {
      console.log('default triggered');
    }
  }
}

