import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// const store = createStore(rootReducer);//initial
const store = createStore( rootReducer, {}, applyMiddleware(reduxThunk) );

export default store;
