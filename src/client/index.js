import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store/index';
import App from './components/App';

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
);

const render = RootComponent => (
  ReactDom.render(
    <RootComponent />,
    document.getElementById('tetris')
  )
);

render(Root);

/** Hot Module Replacement API */
if (module.hot) { module.hot.accept(() => render(Root)); }
