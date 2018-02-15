import React from 'react';

import { sendDataToPeers } from '../../helpers/webRTC';

const RTCConn = () => {
  return (
    <div>
      <button onClick={() => sendDataToPeers('niktamer')}>
        clique ici
      </button>
      <span>BOJNOUR THIBO</span>
    </div>
  );
};

export default RTCConn;
