import React, { Component } from 'react';
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


import * as socket from '../../socket/index';
import actions from '../../actions/index';
import { getPeer } from '../../helpers/webRTC';
import store from '../../store/index';

import './AllGamesView.scss';


const { socketUpdatePlayer, socketCreateGame, socketJoinGame, getAllGames } = actions;

class AllGamesViewWrapper extends Component {
  componentWillMount() {
    store.dispatch(getAllGames());
  }

  render() {
    return (
      <AllGamesViewConnected />
    );
  }
}

const AllGamesView = ({ nickname, game, gamesList, dispatch, location }) => {
  if (location) {
    return <Redirect to={location} />;
  }
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
    const peer = getPeer();
    dispatch(socketUpdatePlayer({ nickname, webRTCId: peer.id }));
    dispatch(socketJoinGame(game.id));
  };

  /*
  ** Create new Player. Create a game.
  */
  const _handleCreate = () => {
    socket.openClient();
    const peer = getPeer();
    dispatch(socketUpdatePlayer({ nickname, webRTCId: peer.id }));
    dispatch(socketCreateGame());
  };

  if (game) return <Redirect to={`/games/${game.id}`} />;

  return (
    <div className="container">
      <h1 className="title">MULTI - ALL GAMES</h1>
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
            gamesList.map((game) => {
              const masterName = game.players.map((player) => {
                if (game.masterId === player.id) return player.nickname;
              });
              return (
                <TableRow key={game.id}>
                  <TableRowColumn>{game.id}</TableRowColumn>
                  <TableRowColumn>{masterName || game.masterId}</TableRowColumn>
                  <TableRowColumn>{game.speed.label}</TableRowColumn>
                  <TableRowColumn>{game.size.label} </TableRowColumn>
                  <TableRowColumn>{`${game.players.length}/${game.maxPlayers}`}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton label="JOIN" onClick={_handleJoin(game)} />
                  </TableRowColumn>
                </TableRow>
                );
            })
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
  location: PropTypes.string,
};

AllGamesView.defaultProps = {
  gamesList: [],
  game: null,
  location: null,
};

const mapStateToProps = state => ({
  gamesList: state.gamesList,
  game: state.game,
  nickname: state.player.nickname,
  location: state.location,
});

const AllGamesViewConnected = connect(mapStateToProps)(AllGamesView);

export default AllGamesViewWrapper;
