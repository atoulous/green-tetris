import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';

import Spectrum from '../Spectrum/Spectrum';

import './TetrisPlayer.scss';

const TetrisPlayer = ({ player }) => (
  <Card style={{ marginRight: '10px', marginBottom: '10px' }}>
    <CardHeader
      title={player.name}
      subtitle={`score: ${player.score}`}
    />
    <Spectrum spectrum={player.spectrum} />
  </Card>
);

TetrisPlayer.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    spectrum: PropTypes.array,
  }).isRequired,

};

export default TetrisPlayer;