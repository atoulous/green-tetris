import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import * as socket from '../../socket';
import actions from '../../actions';
import { getPeer } from '../../helpers/webRTC';

import './AllGamesView.scss';


const { socketUpdatePlayer, socketCreateGame, socketJoinGame, getAllGames } = actions;

const AllGamesView = ({ nickname, game, gamesList, dispatch }) => {
  /*
  ** Get all Games from the API.
  */
  const _getAllGames = () => {
    dispatch(getAllGames());
  };

  /*
  ** Create new Player. Create a game.
  */
  const _handleJoin = game => () => {
    socket.openClient();
    dispatch(socketUpdatePlayer({ nickname, webRTCId: getPeer().id }));
    dispatch(socketJoinGame(game.id));
  };

  /*
  ** Create new Player. Create a game.
  */
  const _handleCreate = () => {
    socket.openClient();
    console.log('oijoijoij');
    console.log('peer --- ', getPeer());
    dispatch(socketUpdatePlayer({ nickname, webRTCId: getPeer().id }));
    dispatch(socketCreateGame());
  };

  if (game) return <Redirect to={`/games/${game.id}`} />;

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
            gamesList.map(game => (
              <TableRow key={game.id}>
                <TableRowColumn>{game.id}</TableRowColumn>
                <TableRowColumn>{game.masterId}</TableRowColumn>
                <TableRowColumn>{game.speed} ms</TableRowColumn>
                <TableRowColumn>{game.size} </TableRowColumn>
                <TableRowColumn>{`${game.players.length}/${game.maxPlayers}`}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="JOIN" onClick={_handleJoin(game)} />
                </TableRowColumn>
              </TableRow>
                ))
        }
          </TableBody>
        </Table>
      </div>
      <div className="game-actions">
        <RaisedButton label="CREATE" onClick={_handleCreate} />
        <RaisedButton label="REFRESH" onClick={_getAllGames} />
      </div>
    </div>
  );
};

AllGamesView.propTypes = {
  gamesList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object,
  nickname: PropTypes.string.isRequired,
};

AllGamesView.defaultProps = {
  gamesList: [],
  game: null,
};

const mapStateToProps = state => ({
  gamesList: state.gamesList,
  game: state.game,
  nickname: state.nickname,
});

export default connect(mapStateToProps)(AllGamesView);
