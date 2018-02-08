export default ({ getState }) => next => (action) => {
  const returnValue = next(action);
  window.top.state = getState();
  return returnValue;
};
