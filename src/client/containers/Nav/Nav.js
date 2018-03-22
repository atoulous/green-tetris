import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton';

import actions from '../../actions/index';
import * as socket from '../../socket/index';

import './Nav.scss';

const {
  openNicknameModal,
  closeNicknameModal,
  updateNickname,
  socketUpdatePlayer,
  updateGame,
  changeLocation,
  killAudio } = actions;

const Nav = ({ nickname, isNicknameModalOpen, game, dispatch, }) => {
  let currentNickname = nickname;

  const regexIsGameUrl = new RegExp(/^\/games\/[0-9a-z-]{36}$/);
  const regexIsPlayUrl = new RegExp(/^\/play$/);

  const _openModal = () => {
    dispatch(openNicknameModal());
  };

  const _closeModal = () => {
    dispatch(closeNicknameModal());
  };

  const _handleModalChange = (event, newValue) => {
    currentNickname = newValue;
  };

  const _updateNickname = () => {
    dispatch(updateNickname(currentNickname));
    if (game) dispatch(socketUpdatePlayer({ nickname: currentNickname }));
    _closeModal();
  };

  const _handleHomeButton = () => {
    window.location.replace('/');
    // if (window.location.pathname !== '/') {
    //   if (
    //     regexIsPlayUrl.test(window.location.pathname)
    //     || regexIsGameUrl.test(window.location.pathname)
    //   ) {
    //     socket.closeClient();
    //     dispatch(killAudio());
    //     dispatch(updateGame(null));
    //   }
    //   dispatch(changeLocation('/'));
    //   dispatch(updateGame(null));
    // }
  };

  const actionsModal = [
    <FlatButton
      label="Ok"
      onClick={_updateNickname}
      primary
    />,
    <FlatButton
      label="Cancel"
      onClick={_closeModal}
      primary
    />
  ];

  return (
    <div>
      <AppBar
        className="navBar"
        title={`Red Tetris - ${nickname}`}

        iconElementRight={
          <IconButton tooltip={nickname} onClick={_openModal}>
            <AccountIcon />
          </IconButton>
        }

        iconElementLeft={
          <IconButton tooltip="Home" onClick={_handleHomeButton}>
            <HomeIcon />
          </IconButton>
        }
      />

      <Dialog
        title="Change your pseudo"
        actions={actionsModal}
        modal={false}
        open={isNicknameModalOpen}
        onRequestClose={_closeModal}
      >
        <TextField
          id="nickname-modal-field"
          defaultValue={currentNickname}
          onChange={_handleModalChange}
        />
      </Dialog>

    </div>
  );
};

const mapStateToProps = state => ({
  nickname: state.player.nickname,
  isNicknameModalOpen: state.isNicknameModalOpen,
  game: state.game,
});

Nav.propTypes = {
  nickname: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isNicknameModalOpen: PropTypes.bool.isRequired,
  game: PropTypes.object,
};

Nav.defaultProps = {
  game: null,
  nickname: 'Player'
};

export default connect(mapStateToProps)(Nav);
