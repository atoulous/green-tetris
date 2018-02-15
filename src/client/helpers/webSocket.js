import io from 'socket.io-client';

let client = null;

export function getClient() {
  if (!client) client = io.connect('/');
  return client;
}
