/**
 * Logging middleware
 *
 * @param store
 * @returns {function(*): function(*=)}
 */
export default store => next => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.group(action.type);
    console.info('dispatching', action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
  }
  return next(action);
};
