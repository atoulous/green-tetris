import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './HomeView/Home';
import AllGamesView from './AllGamesView/AllGamesView';
import GameSettingsView from './GameSettingsView/GameSettingsView';
import Nav from './Nav/Nav';

const NotFound = () => (
  <div>
    NOTHING FOUND HERE
  </div>
);

const App = () => (
  <div>
    <Nav />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={AllGamesView} />
        <Route path="/games/:id" component={GameSettingsView} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
