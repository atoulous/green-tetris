import io from 'socket.io-client';

import handleGameSocket from './handleGameSocket';
import handleTetrisSocket from './handleTetrisSocket';
import handlePlayerSocket from './handlePlayerSocket';


let client = null;

export function getClient() {
  return client;
}

export function closeClient() {
  if (client) {
    client.close();
    client = null;
  }
}

export function openClient() {
  client = io.connect('/');

  client.on('connect', () => {
    const data = { path: '/updateId', id: client.id };
    handlePlayerSocket(data);
  });

  client.on('/game', data => handleGameSocket(data));
  client.on('/tetris', data => handleTetrisSocket(data));
  client.on('/player', data => handlePlayerSocket(data));

  client.on('disconnect', () => {
    const data = { path: '/update', game: null };
    handleGameSocket(data);
    client = null;
  });
}
