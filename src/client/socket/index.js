import io from 'socket.io-client';

import handleGameSocket from './handleGameSocket';
import handlePlayerSocket from './handlePlayerSocket';
import handleErrorSocket from './handleErrorSocket';

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
  client.on('/player', data => handlePlayerSocket(data));
  client.on('/error', data => handleErrorSocket(data));

  client.on('disconnect', () => {
    const data = { path: '/update', game: null };
    handleGameSocket(data);
    client = null;
  });
}
