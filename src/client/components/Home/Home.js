import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import * as socket from '../../socket';
import actions from '../../actions';
import store from '../../store';

import './Home.scss';

const { socketCreateGame, changeLocation } = actions;

const HomeRender = ({ dispatch, game }) => {
  /*
  ** Create new Player. Create a game.
  */
  const _handleCreate = () => {
    socket.openClient();
    dispatch(socketCreateGame({ isSolo: true }));
  };

  if (game) return <Redirect to={`/games/${game.id}`} />;

  return (
    <div className="container" style={{ backgroundImage: `url(${'../../assets/ScreenShot.png'})` }}>
      <h1 className="title">GAME MODE</h1>
      <div className="container-menu">
        <ul id="home-menu">
          <li>
            <RaisedButton label="SOLO" fullWidth onClick={_handleCreate} />
          </li>
          <li>
            <Link to="/games">
              <RaisedButton label="MULTIPLAYERS" fullWidth />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
});

HomeRender.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const HomeConnected = connect(mapStateToProps)(HomeRender);

class HomeWrapper extends Component {
  componentWillMount() {
    store.dispatch(changeLocation(null));
  }

  render() {
    return (
      <HomeConnected />
    );
  }
}

export default HomeWrapper;
