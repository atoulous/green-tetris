const players = [];

/**
 * Get players connected
 *
 * @return {Array} - Array of Players instance
 */
export function getPlayers() {
  return players;
}

/**
 * Get players connected
 *
 * @param {Object} player - instance of Player
 * @return {Array}
 */
export function addPlayer(player) {
  return players.push(player);
}
