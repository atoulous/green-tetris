import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home/Home';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
