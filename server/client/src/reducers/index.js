import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import lessonReducer from './lessonReducer';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    lessonState: lessonReducer
});

export default rootReducer;