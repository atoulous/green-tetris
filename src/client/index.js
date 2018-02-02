import React from 'react';
import ReactDom from 'react-dom';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { storeStateMiddleWare } from './middlewares/storeStateMiddleWare';
import reducer from './reducers';
import App from './containers/app';
import { alert } from './actions/alert';

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'));
store.dispatch(alert('And 2nd action'));
