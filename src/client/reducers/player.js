/**
 * Handle nickname updates
 */
export function updateNickname(state, action) {
  return { ...state, player: { ...state.player, nickname: action.nickname } };
}

export function openNicknameModal(state) {
  return { ...state, isNicknameModalOpen: true };
}

export function closeNicknameModal(state) {
  return { ...state, isNicknameModalOpen: false };
}

/**
 * Handle player id (=socketId)
 */
export function updatePlayerId(state, action) {
  return { ...state, player: { ...state.player, id: action.id } };
}
