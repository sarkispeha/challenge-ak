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

export const formatLessonDto = (values, date, volunteerSignUp) => {

    let lessonDto;
    if(volunteerSignUp){
        if(volunteerSignUp === 'instructor'){
            lessonDto = {
                instructor: values.instructor
            }
        }else if(volunteerSignUp === 'shadow'){
            lessonDto = {
                shadow: values.shadow
            }
        }
    }else{
        lessonDto = {
            studentName: values.student_name,
            type: values.lesson_type,
            shadowNecessary: values.shadow_needed,
            time:{
                AM: values.duration === "AM" ? true : false,
                PM: values.duration === "PM" ? true : false,
                allDay: values.duration === "allDay" ? true : false
            },
            createdBy: values.created_by
        }
    }
    if(date !== null){
        lessonDto.date = timeUtil.startOfDayUnix(date);
    }

    return lessonDto;
}