import axios from 'axios';
import { FETCH_LESSONS } from './types';

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

// export const saveNewLesson = (values, date) => async dispatch => {    
//     const dto = {...values, date}
//     const res = await axios.post('/api/lessons', dto);
//     dispatch({type: FETCH_LESSONS, payload: res.data});
// }