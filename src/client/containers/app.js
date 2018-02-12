import React from 'react';

import GridContainer from '../containers/gridContainer';
import StartDisplay from '../containers/startDisplay';
import RTCTest from '../containers/RTCTest';
import AddRowButton from '../containers/addRowButton';


const App = () => (
  <div>
    <GridContainer />
    <StartDisplay />
    <RTCTest />
    <AddRowButton label="add Row"/>
    <ConnectedRTCConn />
  </div>
);

export default App;
