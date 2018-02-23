/**
 * Update error in redux-tree.
 */
export function updateError(state, action) {
  return { ...state, error: action.error };
}
