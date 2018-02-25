import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './HomeView/Home';
import AllGamesView from './AllGamesView/AllGamesView';
import GameSettingsView from './GameSettingsView/GameSettingsView';
import TetrisView from './TetrisView/TetrisView';
import Error from './Error/Error';

import Layout from './Layout/Layout';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Error />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={AllGamesView} />
        <Route exact path="/play" component={TetrisView} />
        <Route exact path="/games/:id" component={GameSettingsView} />
        <Route component={Home} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
