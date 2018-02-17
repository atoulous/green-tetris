import actions from '../actions';
import {
  togglePlay,
  drawPiece,
  erasePiece,
  increaseSpeed,
  refreshGridWithoutCurrent,
  setNewPiece,
  setPiece,
  deleteRows,
  addRow,
  updateSpectrum,
  updateScore,
} from './tetris';

import { setNickname, setOwnNickname, addPlayer, setPlayers } from './player';

import { rtcConnexion, rtcMessage } from './connexion';

import { initBag, initGrid, initSpectrum } from '../helpers';

const initialState = {
  piecesQueue: [],
  gridWithoutCurrent: initGrid(),
  grid: initGrid(),
  currentPiece: null,
  bag: initBag(),
  speed: 1000,
  spectrum: initSpectrum(),
  score: 0,
  nickname: 'defaultName',
  players: [{ nickname: 'Me', webRTCId: 0, score: 0, spectrum: initSpectrum() }, { nickname: 'You', webRTCId: 1, score: 0, spectrum: initSpectrum() }],
};

const {
  DRAW_PIECE,
  ERASE_PIECE,
  SET_PIECE,
  TOGGLE_PLAY,
  SET_NEW_PIECE,
  REFRESH_GRID_WITHOUT_CURRENT,
  INCREASE_SPEED,
  DELETE_ROWS,
  ADD_ROW,
  UPDATE_SPECTRUM,
  UPDATE_SCORE,

  RTC_CONN,
  RTC_MESSAGE,

  SET_NICKNAME,
  SET_OWN_NICKNAME,
  ADD_PLAYER,
  SET_PLAYERS,
} = actions;

/*
** Reducer for Tetris-related operations.
*/
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_PIECE:
      return drawPiece(state);
    case ERASE_PIECE:
      return erasePiece(state);
    case SET_PIECE:
      return setPiece(state, action.piece);
    case SET_NEW_PIECE:
      return setNewPiece(state);
    case REFRESH_GRID_WITHOUT_CURRENT:
      return refreshGridWithoutCurrent(state);
    case INCREASE_SPEED:
      return increaseSpeed(state);
    case TOGGLE_PLAY:
      return togglePlay(state);
    case DELETE_ROWS:
      return deleteRows(state, action.rowsToDelete);
    case ADD_ROW:
      return addRow(state);
    case UPDATE_SPECTRUM:
      return updateSpectrum(state, action.grid);
    case UPDATE_SCORE:
      return updateScore(state, action.score);

    case RTC_CONN:
      return rtcConnexion(state, action);
    case RTC_MESSAGE:
      return rtcMessage(state);

    case SET_NICKNAME:
      return setNickname(state, action);
    case SET_OWN_NICKNAME:
      return setOwnNickname(state, action);
    case ADD_PLAYER:
      return addPlayer(state, action);
    case SET_PLAYERS:
      return setPlayers(state, action);

    default:
      return state;
  }
}

