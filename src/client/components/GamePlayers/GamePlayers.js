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


import './GamePlayers.scss';


const GamePlayers = ({ game, dispatch }) => {
  const handleKick = player => () => {
    console.log('KICK THE PLAYER:', player);
    /*
    ** Change state here with dispatch
    */
  };

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
          {
            game.currentPlayers.map(player => (
              <TableRow key={player.id}>
                <TableRowColumn>{player.name}</TableRowColumn>
                <TableRowColumn>{player.isReady}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Kick" onClick={handleKick(player)} />
                </TableRowColumn>
              </TableRow>
                ))
        }
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
