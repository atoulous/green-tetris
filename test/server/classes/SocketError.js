class SocketError extends Error {
  constructor(type, ...params) {
    super(params);
    this.type = type;
    this.name = 'papa';
    this.socketId = null;

    // Maintenir dans la pile une trace adéquate de l'endroit où l'erreur a été déclenchée.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SocketError);
    }
  }
}


try {
  throw new SocketError('/game', 'Ceci est un test');
} catch (e) {
  if (e instanceof ) { console.log('ahaha'); }
}
