import io from 'socket.io-client';

let client;

export function getClient() {
  if (client) return client;
  client = io.connect('/');
  return client;
}
