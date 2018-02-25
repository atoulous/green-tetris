import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import actions from '../../actions';
import * as socket from '../../socket';

import './Nav.scss';

const { openNicknameModal, closeNicknameModal, updateNickname, socketUpdatePlayer, updateGame, changeLocation } = actions;

const Nav = ({ nickname, isNicknameModalOpen, game, dispatch, }) => {
  let currentNickname = nickname;
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

  const Menu = (
    <DropDownMenu value="Menu" onChange={_openModal}>
      <MenuItem primaryText="Change Nickname" />
    </DropDownMenu>
  );

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

  const regexIsGameUrl = new RegExp(/^\/games\/[0-9a-z-]{36}$/);

  return (
    <div>
      <AppBar
        title={
          <div>
            <FlatButton
              label='HOME'
              onClick={() => {
                if (window.location.pathname !== '/') {
                    if (regexIsGameUrl.test(window.location.pathname)) {
                      socket.closeClient();
                    }
                    dispatch(changeLocation('/'));
                    dispatch(updateGame(null));
                }
              }
              }
            />
            <span>
            {`Green Tetris - ${nickname}`}
          </span>
          </div>
        }
        showMenuIconButton={false}
        iconElementRight={Menu}
      />
      <Dialog
        title="Choose a nickname"
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
  nickname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isNicknameModalOpen: PropTypes.bool.isRequired,
  game: PropTypes.object,
};

Nav.defaultProps = {
  game: null,
};

export default connect(mapStateToProps)(Nav);
