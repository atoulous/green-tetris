import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './HomeView/Home';
import AllGamesView from './AllGamesView/AllGamesView';
import GameSettingsView from './GameSettingsView/GameSettingsView';

const NotFound = () => (
  <div>
    NOTHING FOUND HERE
  </div>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/games" component={AllGamesView} />
      <Route path="/games/:id" component={GameSettingsView} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
