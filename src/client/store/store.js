import finalReducer from '../reducers/index';
import applyMiddleware from '../middlewares/index';

export default const store = createStore(finalReducer, applyMiddleware);
