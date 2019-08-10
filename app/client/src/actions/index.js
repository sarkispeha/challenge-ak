import axios from 'axios';
import { FETCH_LESSONS, FETCH_USERS } from './types';

export const fetchLessons = () => async dispatch => {

    const res = await axios.get('/api/lessons');
    console.log('FETCHING LESSONS IN ROOT ACTIONS2', res);
    dispatch({type: FETCH_LESSONS, payload: res.data});
};

export const saveNewLesson = (lessonDto) => async () => {

    const res = await axios.post('/api/lessons', lessonDto);
    return res.data;
}

export const updateLesson = (lessonDto, lessonId) => async () => {

    const res = await axios.put('/api/lessons/' + lessonId, lessonDto);
    return res.data;
}

export const saveNewUser = (userDto) => async () => {

    const res = await axios.post('/api/users', userDto);
    return res.data;
    
}

export const fetchUsers = () => async dispatch => {

    const res = await axios.get('/api/users');
    console.log('FETCHING USERS FROM ACTIONS INDEX', res.data);
    
    // return res.data;
    dispatch({type: FETCH_USERS, payload: res.data});

    //for self learning purposes, need to figure out why the dispatch works
    //and why a return res.data does not
}
