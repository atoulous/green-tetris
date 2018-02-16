let allGames;

export function getGames() {
  if (!allGames) allGames = [];
  return allGames;
}

export function addGame(game) {
  getGames().push(game);
}
