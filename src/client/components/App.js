import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import AllGamesView from '../containers/AllGamesView/AllGamesView';
import GameSettingsView from '../containers/GameSettingsView/GameSettingsView';
import TetrisView from '../containers/TetrisView/TetrisView';
import Error from '../containers/Error/Error';

import Layout from './Layout/Layout';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Error />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={AllGamesView} />
        <Route exact path="/games/:id" component={GameSettingsView} />
        <Route exact path="/play" component={TetrisView} />
        <Route component={Home} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
