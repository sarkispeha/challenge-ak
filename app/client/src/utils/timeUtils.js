import moment from 'moment';

export const dateToUnix = (date) => {
    return moment(date).unix();
}

export const startOfDayUnix = (date) => {
    return moment(date).startOf('day').unix();
}

export const unixToCalDate = (unixNumber, hour) => {

    let format = moment.unix(unixNumber).format("YYYY, MM, DD, HH");
    let dateArr = format.split(',').map(Number);
    dateArr[1] = dateArr[1] - 1;
    return new Date(...dateArr);
}

export const timeOfDay = (currentLesson) => {
    if( currentLesson === undefined ){
        return;
    }
    for( let prop in currentLesson.time){
        if(currentLesson.time[prop] === true){
            return prop;
        } 
    };
}