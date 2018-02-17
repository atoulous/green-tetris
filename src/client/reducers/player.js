import { initSpectrum } from '../helpers';

export function setNickname(state, action) {
  const { players } = state;
  const { nickname, webRTCId } = action.data;
  const tmp = players.map((player) => {
    if (player.webRTCId === webRTCId) {
      return { ...player, nickname };
    }
    return player;
  });

  return { ...state, players: tmp };
}

export function addPlayer(state, action) {
  const { players } = state;
  const { nickname, webRTCId } = action.data;

  return {
    ...state,
    players: [...players, { nickname, webRTCId, spectrum: initSpectrum(), score: 0 }]
  };
}

export function setOwnNickname(state, action) {
  return { ...state, nickname: action.data.nickname };
}

export function setPlayers(state, action) {
  return { ...state, players: action.data.players };
}


/*
** Handle nickname updates
*/
export function updateNickname(state, action) {
  return { ...state, nickname: action.nickname };
}

export function openNicknameModal(state) {
  return { ...state, isNicknameModalOpen: true };
}

export function closeNicknameModal(state) {
  return { ...state, isNicknameModalOpen: false };
}
