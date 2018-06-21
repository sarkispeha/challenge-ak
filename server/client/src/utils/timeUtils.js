import moment from 'moment';

export const dateToUnix = (date) => {
    return moment(date).unix();
}

export const startOfDayUnix = (date) => {
    return moment(date).startOf('day').unix();
}