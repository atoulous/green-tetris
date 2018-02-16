import { initSpectrum } from '../helpers';

export function setNickname(state, action) {
  const { players } = state;
  const { nickname, webRTCId } = action;

  return { ...state,
    players: players.map(
      player =>
        (player.webRTCId === webRTCId ? { ...player, nickname } : player )) };
}

export function addPlayer(state, action) {
  const { players } = state;
  console.log('action --- ', action);
  const { nickname, webRTCId } = action.data;

  return { ...state, players: [...players, { nickname, webRTCId, spectrum: initSpectrum(), score: 0 }] };
}
