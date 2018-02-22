import React from 'react';
import { connect } from 'react-redux';

const AudioContainer = ({ audioStreams }) => {
  return (
    <audio autoPlay >
          {
            audioStreams.map((stream, i) => (<source key={i} src={window.URL.createObjectURL(stream)} />))
          }
    </audio>
  );
};

const mapStateToProps = state => ({
  audioStreams: state.audioStreams,
});

export default connect(mapStateToProps)(AudioContainer);
