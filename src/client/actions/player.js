/**
 * Handle nickname modal
 */
export const OPEN_NICKNAME_MODAL = 'OPEN_NICKNAME_MODAL';
export function openNicknameModal() {
  return { type: OPEN_NICKNAME_MODAL };
}

export const CLOSE_NICKNAME_MODAL = 'CLOSE_NICKNAME_MODAL';
export function closeNicknameModal() {
  return { type: CLOSE_NICKNAME_MODAL };
}

export const UPDATE_NICKNAME = 'UPDATE_NICKNAME';
export function updateNickname(nickname) {
  return { type: UPDATE_NICKNAME, nickname };
}

/**
 * Handle player id.
 */
export const UPDATE_PLAYER_ID = 'UPDATE_PLAYER_ID';
export function updatePlayerId(id) {
  return { type: UPDATE_PLAYER_ID, id };
}
