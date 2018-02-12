import React from 'react';

import GridContainer from '../containers/gridContainer';
import StartDisplay from '../containers/startDisplay';
import RTCTest from '../containers/RTCTest';
import AddRowButton from '../containers/addRowButton';

const App = () => (
  <div>
    <GridContainer />
    <StartDisplay />
    <AddRowButton label="add Row"/>
    <RTCTest />
  </div>
);

export default App;
