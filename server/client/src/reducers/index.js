import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import sessionReducer from './session';
import userReducer from './user';
import lessonReducer from './lessonReducer';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    lessonState: lessonReducer,
    form: reduxForm
});

export default rootReducer;