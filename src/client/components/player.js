import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import Spectrum from './spectrum';
// import Label from './label';


// const Player = ({ player }) => (
//   <div className="player-box">
//     <div className="player-header">
//       <Label additionalClasses={['player', 'left']}>{player.name}</Label>
//       <Label additionalClasses={['player', 'right']}>{player.score}</Label>
//     </div>
//     <div className="player-content">
//       <Spectrum spectrum={player.spectrum} />
//     </div>
//   </div>);

const Player = ({ player }) => (
  <Card style={{ marginRight: '10px', marginBottom: '10px' }}>
    <CardHeader
      title={player.name}
      subtitle={`score: ${player.score}`}
    />
    <Spectrum spectrum={player.spectrum} />
  </Card>
);

Player.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    spectrum: PropTypes.array,
  }).isRequired,

};

export default Player;
