import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row/Row';

import './Spectrum.scss';

const Spectrum = ({ spectrum }) => (
  <div className="spectrum">
    {spectrum.map((e, i) => (<Row key={i} row={e} />))}
  </div>
);

Spectrum.propTypes = {
  spectrum: PropTypes.array,
};

Spectrum.defaultProps = {
  spectrum: [],
};


export default Spectrum;
