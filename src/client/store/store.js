import { createStore } from 'redux';

import { finalReducer } from '../reducers/';
import applyMiddleware from '../middlewares';

export default createStore(finalReducer, applyMiddleware);
