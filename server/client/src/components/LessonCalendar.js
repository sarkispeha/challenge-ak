import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import _ from 'lodash';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import AdminLessonModal from './modals/AdminLessonModal';
// import SignUpLessonModal from './modals/SignUpLessonModal';
import * as timeUtil from '../utils/timeUtils';
import * as actions from '../actions';
import { firebase, user } from '../firebase';

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class LessonCalendar extends Component {

    constructor(props){
        super();
        this.state = {
            isAdminLessonModalVisible: false,
            modalTitle: '',
            isAdminEdit: false,
            isVolunteerEdit: false,
            lessonDetail: {},
            isAdminUpdate: false
          }
    }

    componentDidMount() {  

        this.props.fetchLessons().then( () =>{
            for(let i = 0; i < this.props.lessons.length; i++){
                let currentLesson = this.props.lessons[i];
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
            }
            // console.log('Finished LESSONS', this.props.lessons);
            
        });

        firebase.auth.onAuthStateChanged(authUser => {
            if(!authUser){
                return;
            }
            user.getOneUser(authUser.uid).then(snapshot =>{
                this.setState({
                    userPermissions: snapshot.val().role
                })
            })
        })
        
    }

    selectEvent = (event) => {
        if(this.state.userPermissions === 'admin'){
            //show AdminLessonModal with event data
            this.setState({
                isAdminLessonModalVisible : true,
                isAdminUpdate : true,
                lessonDetail : {...event}
            })
        }//else if(this.state.userPermissions === 'volunteer'){
        //     this.setState({
        //         isSignUpModalVisible: true,
        //         isAdminEdit : true
        //     });
        // }
        
    }

    selectSlot = (slotInfo) => {

        if(this.state.userPermissions === 'admin'){ 
            //show AdminLessonModal
            this.setState({
                isAdminLessonModalVisible: true,
                isAdminEdit : true,
                isAdminUpdate : false,
                modalDate: slotInfo.start.toLocaleString(),
                lessonDetail : {}
            });
        }
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
        
        const newLesson = await this.props.saveNewLesson(lessonDto);
     
        this.setState({
            lessons: this.props.lessons.push(newLesson),
            isAdminLessonModalVisible: false
        })
  
    }

    handleUpdateLesson = async (values, lessonId) => {

        const lessonDto = {
            studentName: values.student_name,
            type: values.lesson_type,
            shadowNecessary: values.shadow,
            time:{
                AM: values.duration === "AM" ? true : false ,
                PM: values.duration === "PM" ? true : false,
                allDay: values.duration === "allDay" ? true : false
            },
            createdBy: 'Updated Somebody'
        }
        
        const updatedLesson = await this.props.updateLesson(lessonDto, lessonId);
        let oldLessonIndx = _.findIndex(this.props.lessons, {_id : lessonId} );

        //TODO create correctly formatted updatedLesson to display on BigCalendar
        this.props.lessons.splice(oldLessonIndx, 1, updatedLesson);

        this.setState({
            lessons: this.props.lessons,
            isAdminLessonModalVisible: false
        })
    }

    closeModal = () => {
        this.setState({
            isAdminLessonModalVisible : false
        })
    }
    
    render() {

        return (
            <div>
              
                <AdminLessonModal
                    isModalVisible={this.state.isAdminLessonModalVisible}
                    isAdminEdit={this.state.isAdminEdit}
                    isAdminUpdate={this.state.isAdminUpdate}
                    lessonDetail={this.state.lessonDetail}
                    isVolunteerEdit={this.state.isVolunteerEdit}
                    modalDate={this.state.modalDate}
                    handleSaveLesson={this.handleSaveLesson}
                    handleUpdateLesson={this.handleUpdateLesson}
                    closeModal={this.closeModal}
                >
                </AdminLessonModal>

                {/* <SignUpLessonModal
                    isModalVisible={this.state.isSignUpLessonModalVisible}
                    isVolunteerEdit={this.state.isVolunteerEdit}
                >
                </SignUpLessonModal>   */}

            <div style={{height: '90vh'}} >
                <BigCalendar
                selectable
                events={this.props.lessons}
                views={allViews}
                step={60}
                startAccessor='start'
                endAccessor='end'
                onSelectEvent={event => this.selectEvent(event)}
                onSelectSlot={ slotInfo => this.selectSlot(slotInfo)}
                />
            </div>

            </div>
        )
    } 
};

function mapStateToProps(state){ 
    return {
        lessons: state.lessonState
    }
}

export default connect(mapStateToProps, actions)(LessonCalendar);