import * as timeUtil from './timeUtils';

export const formatForBigCal = (currentLesson) => {
    // let currentLesson = this.props.lessons[i];
    let lessonDate = currentLesson.date;
    let startLessonTime, endLessonTime;

    let timeOfDayCalc = timeUtil.timeOfDay(currentLesson);

    if(timeOfDayCalc === 'AM'){
        startLessonTime = timeUtil.unixToCalDate( lessonDate + 36000);
        endLessonTime = timeUtil.unixToCalDate( lessonDate + 43200);
    }else if (timeOfDayCalc === 'PM'){
        startLessonTime = timeUtil.unixToCalDate( lessonDate + 50400);
        endLessonTime = timeUtil.unixToCalDate( lessonDate + 57600);
    }else{
        startLessonTime = timeUtil.unixToCalDate( lessonDate + 36000);
        endLessonTime = timeUtil.unixToCalDate( lessonDate + 57600);
    }
    
    currentLesson.start = startLessonTime;
    currentLesson.end = endLessonTime;
    currentLesson.title = timeOfDayCalc !== 'allDay' ? currentLesson.type + ' ' + timeOfDayCalc : currentLesson.type + ' All Day';
    
    return currentLesson;
}