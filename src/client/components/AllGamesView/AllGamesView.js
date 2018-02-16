import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import './AllGamesView.scss';


const AllGamesView = ({ games }) => {
  const handleJoin = game => () => {
    console.log('JOIN: ', game);
    /*
    ** Here what happen when we click on join.
    */
  };

  const handleCreate = () => {
    console.log('CREATE: ');
    /*
    ** Here what happen when we click on create.
    */
  };

  return (
    <div className="container">
      <div className="games-list">
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Id</TableHeaderColumn>
              <TableHeaderColumn>Master</TableHeaderColumn>
              <TableHeaderColumn>Speed</TableHeaderColumn>
              <TableHeaderColumn>Size</TableHeaderColumn>
              <TableHeaderColumn>Players</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
            games.map(game => (
              <TableRow key={game.id}>
                <TableRowColumn>{game.id}</TableRowColumn>
                <TableRowColumn>{game.master}</TableRowColumn>
                <TableRowColumn>{game.speed} ms</TableRowColumn>
                <TableRowColumn>{`${game.size.x}/${game.size.y}`} </TableRowColumn>
                <TableRowColumn>{`${game.currentPlayers.length}/${game.maxPlayers}`}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="JOIN" onClick={handleJoin(game)} />
                </TableRowColumn>
              </TableRow>
                ))
        }
          </TableBody>
        </Table>
      </div>
      <div className="game-actions">
        <RaisedButton label="CREATE" onClick={handleCreate} />
      </div>
    </div>
  );
};

AllGamesView.propTypes = {
  games: PropTypes.array,
};

AllGamesView.defaultProps = {
  games: [],
};

const mapStateToProps = state => ({
  games: state.games
});

export default connect(mapStateToProps)(AllGamesView);
