export default const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch);
    socket.on('peer', newPeer => {
      if (newPeer.id !== getState().connexion.peer.id) {
        const conn = getState().connexion.peer.connect(newPeer.id);
        conn.on('open', () => {
          dispatch(RTCConnectionAction(conn));
        })
      }
    })
  }
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0) {
      socket.emit('action', action);
    }
    return next(action);
  }
};