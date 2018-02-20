import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Chip from 'material-ui/Chip';

import actions from '../../actions';

import './GamePlayers.scss';

const { socketKickPlayer } = actions;

const GamePlayers = ({ game, dispatch }) => {
  const handleKick = player => () => {
    console.log('KICK THE PLAYER:', player);
    dispatch(socketKickPlayer(player.id));
    /*
    ** Change state here with dispatch
    */
  };

  const playersTable = [];

  for (let i = 0; i < game.maxPlayers; i++) {
    if (game.players[i]) {
      playersTable.push(<TableRow key={i}>
        <TableRowColumn>{game.players[i].nickname}</TableRowColumn>
        <TableRowColumn>{
              (game.players[i].isReady) ? <Chip backgroundColor="#74d680">Ready</Chip> : <Chip backgroundColor="#ff7878">Waiting</Chip>
            }
        </TableRowColumn>
        <TableRowColumn>
          <RaisedButton label="Kick" onClick={handleKick(game.players[i])} />
        </TableRowColumn>
                        </TableRow>);
    } else {
      playersTable.push(<TableRow key={i}>
        <TableRowColumn> - </TableRowColumn>
        <TableRowColumn />
        <TableRowColumn />
                        </TableRow>);
    }
  }


  return (
    <div className="game-players">
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Is Ready ?</TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {playersTable}
        </TableBody>
      </Table>
    </div>
  );
};

GamePlayers.propTypes = {
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default GamePlayers;
