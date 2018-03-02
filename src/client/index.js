import React from 'react';
import ReactDom from 'react-dom';

import Root from './Root';

/**
 * Render web app
 *
 * @param RootComponent
 */
export function render(RootComponent) {
  ReactDom.render(
    <RootComponent />,
    document.getElementById('tetris')
  );
}

/**
 * Start the web app
 *
 * @param _Root
 */
export function start(_Root) {
  return render(_Root);
}

if (!module.parent) start(Root);

/** Hot Module Replacement API */
if (module.hot) module.hot.accept('./Root', () => render(require('./Root').default)); // eslint-disable-line global-require

