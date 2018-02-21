import io from 'socket.io-client';

let client = null;

/**
 *
 * @returns {*}
 */
export function getClient() {
  return client;
}

/**
 *
 * @returns {Promise<*>}
 */
export async function openClient() {
  await new Promise((resolve) => {
    client = io.connect('/');
    resolve();
  });
  return client;
}

/**
 *
 */
export function closeClient() {
  if (client) {
    client.close();
    client = null;
  }
}
