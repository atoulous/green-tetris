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
import { updateNickname, openNicknameModal, closeNicknameModal, updatePlayerId } from './player';
import { rtcMessage, addAudioStream, toggleMuted } from './connexion';
import { setGame, updateGamesList, updateGame } from './game';
import { updateError } from './error';

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
  muted: false,
  player: {
    id: null,
    nickname: 'Player'
  },
  isNicknameModalOpen: false,
  audioStreams: [],
  error: null,
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
  UPDATE_PLAYER_ID,
  UPDATE_ERROR,

  RTC_MESSAGE,
  ADD_AUDIO_STREAM,
  TOGGLE_MUTED,

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
    case UPDATE_PLAYER_ID:
      return updatePlayerId(state, action);
    case UPDATE_ERROR:
      return updateError(state, action);

    case RTC_MESSAGE:
      return rtcMessage(state, action);
    case ADD_AUDIO_STREAM:
      return addAudioStream(state, action);
    case TOGGLE_MUTED:
      return toggleMuted(state, action);


    case SET_GAME:
      return setGame(state, action);

    default:
      return state;
  }
}

