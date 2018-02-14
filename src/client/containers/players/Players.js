import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import Player from '../../components/player/Player';
import './Players.scss';

const style = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'start',
  padding: '10px',
};

const Players = ({ players }) => (
  <div className="players">
    <Paper style={style} zDepth={2} rounded={false} >
      {players.map(player => <Player key={player.id} player={player} />)}
    </Paper>
  </div>
);

const mapStateToProps = state => ({
  players: state.players,
});

export default connect(mapStateToProps)(Players);
