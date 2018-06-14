import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { fetchLessons } from '../actions';

//make moment helper
// let test = moment.unix(1528920360).format("YYYY, MM, DD")
//new Date(test)

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class LessonCalendar extends Component {

    componentDidMount() {
        console.log('GETTING LESSONS FROM COMPONENTDIDMOUNT');    
        this.props.fetchLessons(); 
    }
    
    render() {
        return (
            <div style={{height: '90vh'}} >
                <BigCalendar
                selectable
                events={this.props.lessons}
                views={allViews}
                step={60}
                startAccessor='start'
                endAccessor='end'
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={slotInfo =>
                    alert(
                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        `\nend: ${slotInfo.end.toLocaleString()}` +
                        `\naction: ${slotInfo.action}`
                    )
                }
                />
            </div> 
        )
    } 
};
  
function mapStateToProps(state){
    console.log('MAPSTATETOPROPS LESSONSTATE', state.lessonState);    
    return {lessons: state.lessonState}
}

export default connect(mapStateToProps, { fetchLessons })(LessonCalendar);