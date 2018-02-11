import React from 'react';
import { connect } from 'react-redux';

import GridContainer from '../containers/gridContainer';
import StartDisplay from '../containers/startDisplay';


const RTCConn = (props) => {
  console.log('props are -----', props);
  let { RTCConns } = props;

  const sendDataToChannel = (RTCConns) => {
    console.log('prepare to error ', RTCConns);
    RTCConns.forEach(RTCConn => {
      RTCConn.conn.send('niktamer');
    });
  };

  return (

    <div>
      <button onClick={() => sendDataToChannel(RTCConns)}>
        clique ici
      </button>
      <span>BOJNOUR THIBO</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('state cur --', state);
  return ({
    RTCConns: state.RTCConns
  });
};

const ConnectedRTCConn = connect(mapStateToProps, null)(RTCConn);

const App = () => (
  <div>
    <GridContainer />
    <StartDisplay />
    <ConnectedRTCConn />
  </div>
);

export default App;
