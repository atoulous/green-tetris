import React from 'react';
import { connect } from 'react-redux';

const RTCConn = (props) => {
  let { RTCConns } = props;

  const sendDataToChannel = (RTCConns) => {
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
  return ({
    RTCConns: state.RTCConns
  });
};

export default connect(mapStateToProps, null)(RTCConn);
