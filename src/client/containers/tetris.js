import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import Score from './Score';
import Game from './Game';

const style = {
  height: '100%',
  width: '100%',
  padding: '10px',
};

const Tetris = () => (
  <div className="tetris">
    <Paper style={style} zDepth={2} rounded={false}>
      <Score />
      <Divider style={{ marginBottom: '10px' }} />
      <Game />
    </Paper>
  </div>
);

export default Tetris;
