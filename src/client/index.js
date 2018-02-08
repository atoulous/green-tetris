
// React
import React from 'react';
import ReactDom from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import App from './containers/app';


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tetris')
);
