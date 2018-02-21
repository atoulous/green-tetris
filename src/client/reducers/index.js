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

import { updateNickname, openNicknameModal, closeNicknameModal } from './player';
import { setGame, updateGamesList, updateGame } from './game';

import { rtcMessage, } from './connexion';

import { initBag, initGrid, initSpectrum } from '../utils/tetris';

const initialState = {
  piecesQueue: [],
  gridWithoutCurrent: initGrid(),
  grid: initGrid(),
  currentPiece: null,
  bag: initBag(),
  speed: 1000,
  spectrum: initSpectrum(),
  score: 0,
  gamesList: [],
  game: null,
  nickname: 'defaultName',
  isNicknameModalOpen: false,
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
  OPEN_NICKNAME_MODAL,
  CLOSE_NICKNAME_MODAL,
  UPDATE_NICKNAME,
  UPDATE_GAMES_LIST,
  UPDATE_GAME,

  RTC_CONN,

  SET_GAME
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
    case OPEN_NICKNAME_MODAL:
      return openNicknameModal(state);
    case CLOSE_NICKNAME_MODAL:
      return closeNicknameModal(state);
    case UPDATE_NICKNAME:
      return updateNickname(state, action);
    case UPDATE_GAMES_LIST:
      return updateGamesList(state, action);
    case UPDATE_GAME:
      return updateGame(state, action);

    case RTC_CONN:
      return rtcMessage(state);

    case SET_GAME:
      return setGame(state, action);

    default:
      return state;
  }
}

