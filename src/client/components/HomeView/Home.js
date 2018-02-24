import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as socket from '../../socket';
import actions from '../../actions';

import './Home.scss';

const { socketCreateGame } = actions;


const Home = ({ dispatch, game }) => {
  /*
  ** Create new Player. Create a game.
  */
  const _handleCreate = () => {
    socket.openClient();
    dispatch(socketCreateGame({ isSolo: true }));
  };

  if (game) return <Redirect to={`/games/${game.id}`} />;

  return (
    <div className="container">
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

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Home);
