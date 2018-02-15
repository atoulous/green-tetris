import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RTCConn = ({ RTCConns }) => {
  const sendDataToChannel = (channels) => {
    channels.forEach((channel) => {
      channel.conn.send('niktamer');
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

RTCConn.propTypes = {
  RTCConns: PropTypes.array,
};

RTCConn.defaultProps = {
  RTCConns: [],
};

const mapStateToProps = state => ({
  RTCConns: state.RTCConns
});

export default connect(mapStateToProps, null)(RTCConn);
