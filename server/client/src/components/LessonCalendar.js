import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import NewLessonModal from './modals/NewLessonModal'
import * as timeUtil from '../utils/timeUtils';
import * as actions from '../actions';

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class LessonCalendar extends Component {

    constructor(props){
        super();
        this.state = {
            isModalVisible: false,
            modalTitle: ''
          }
    }

    componentDidMount() {  
        this.props.fetchLessons();
    }

    onBtnOpenModalClick = (slotInfo) => {
        this.setState({
            isModalVisible: true,
            modalTitle: slotInfo.start.toLocaleString()
        })   
    }

    selectSlot = (slotInfo) => {
        // this.onBtnOpenModalClick(slotInfo);
        this.setState({
            isModalVisible: true,
            modalDate: slotInfo.start.toLocaleString()
        })
        // alert(
        //     `Hey dude you selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        //         `\nend: ${slotInfo.end.toLocaleString()}` +
        //         `\naction: ${slotInfo.action}`
        //     )
    }

    handleSaveLesson = async (values, date) => {

        const lessonDto = {
            studentName: values.student_name,
            type: values.lesson_type,
            shadowNecessary: values.shadow,
            date: timeUtil.startOfDayUnix(date),
            time:{
                AM: values.duration === "AM" ? true : false ,
                PM: values.duration === "PM" ? true : false,
                allDay: values.duration === "allDay" ? true : false
            },
            createdBy: 'Somebody'
        }
        console.log('LESSON DTO', lessonDto);
        
        
        const newLesson = await this.props.saveNewLesson(lessonDto);

        console.log('NEW LESSON AFTER ASYNC', newLesson);
        
        this.setState({
            lessons: this.props.lessons.push(newLesson),
            isModalVisible: false
        })
        console.log('AFTER SAVE PROPS', this.props);
        
    }
    
    render() {

        // const { isModalVisible } = this.state
        return (
            <div>
              
                <NewLessonModal
                    isModalVisible={this.state.isModalVisible}
                    modalDate={this.state.modalDate}
                    handleSaveLesson={this.handleSaveLesson}
                >
                  
                </NewLessonModal>
              
                

            <div style={{height: '90vh'}} >
                <BigCalendar
                selectable
                events={this.props.lessons}
                views={allViews}
                step={60}
                startAccessor='start'
                endAccessor='end'
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={ slotInfo => this.selectSlot(slotInfo)}
                />
            </div>

            </div>
        )
    } 
};

function mapStateToProps(state){ 
    return {lessons: state.lessonState}
}

export default connect(mapStateToProps, actions)(LessonCalendar);