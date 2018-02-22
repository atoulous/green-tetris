import React, { Component } from 'react';

import { initAudioStream, } from '../../helpers/webRTC';

const GetAudio = () => {
  return (
    <button onClick={() => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          /* use the stream */
          initAudioStream(stream);
        })
        .catch((err) => {
          /* handle the error */
          console.log('eerrr - - ', err);
        });
    }}
    >
      mets le son
    </button>

  );
};

export default GetAudio;
