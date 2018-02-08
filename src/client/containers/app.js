import React from 'react';
import { connect } from 'react-redux';

const App = (props) => {
  let { message, RTCConns } = props;

  const sendDataToChannel = (RTCConns) => {
    RTCConns.forEach(RTCConn => {
      RTCConn.conn.send('niktamer');
    });
  };
  return (

    <div>
      <span>{message}</span>
      <button onClick={() => sendDataToChannel(RTCConns)}>
        clique ici
      </button>
      <span>BOJNOUR THIBO</span>
    </div>
  )
};

const mapStateToProps = (state) => ({
  message: state.message,
  RTCConns: state.RTCConns
});

export default connect(mapStateToProps, null)(App);
