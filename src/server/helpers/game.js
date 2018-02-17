import Game from '../classes/Game';
import Player from '../classes/Player';

let allGames;

export function getGames() {
  if (!allGames) allGames = [new Game({ room: 'oijf9898a', gameMaster: new Player({ webRTCId: 'fake', socketId: 'fake' }) })];
  return allGames;
}

export function addGame(game) {
  getGames().push(game);
}

export function getGame(room) {
  return getGames().find(game => {
    console.log('cur game - ', game, room);
    console.log(game.room === room);
    return (game.room === room);
  });
}
