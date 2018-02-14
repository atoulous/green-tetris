import React from 'react';
import Row from '../row/Row';

import './Spectrum.scss';

const Spectrum = ({ spectrum }) => (
  <div className="spectrum">
    {spectrum.map((e, i) => (<Row key={i} row={e} />))}
  </div>
);

export default Spectrum;

