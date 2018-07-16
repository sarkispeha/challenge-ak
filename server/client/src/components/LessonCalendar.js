import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import _ from 'lodash';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import AdminLessonModal from './modals/AdminLessonModal';
import VolunteerLessonModal from './modals/VolunteerLessonModal';

import * as calendarUtil from '../utils/calendarUtils';
import * as actions from '../actions';
import { firebase, user } from '../firebase';

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class LessonCalendar extends Component {

    constructor(props){
        super(props);
        this.state = {
            isAdminLessonModalVisible: false,
            isVolunteerLessonModalVisible: false,
            modalTitle: '',
            isAdminEdit: false,
            isVolunteerEdit: false,
            lessonDetail: {},
            isAdminUpdate: false
          }
    }

    componentDidMount() {  

        this.props.fetchLessons();
        // this.props.fetchLessons().then( () =>{
        //     for(let i = 0; i < this.props.lessons.length; i++){
        //         let currentLesson = this.props.lessons[i];
        //         currentLesson = calendarUtil.formatForBigCal(currentLesson);
        //     }  
        // });
        

        firebase.auth.onAuthStateChanged(authUser => {
            if(!authUser){
                return;
            }
            user.getOneUser(authUser.uid).then(snapshot =>{
                this.setState({
                    userPermissions: snapshot.val().role,
                    userName : snapshot.val().username
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
        }else if(this.state.userPermissions === 'volunteer'){
            //show VolunteerLessonModal with event data
            console.log('LESSON DETAIL', event);
            
            this.setState({
                isVolunteerLessonModalVisible: true,
                isVolunteerEdit : true,
                lessonDetail : {...event},
                modalDate: event.start.toLocaleString(),
            });
        }
        
    }

    selectSlot = (slotInfo) => {

        if(this.state.userPermissions === 'admin'){ 
            //show AdminLessonModal
            this.setState({
                isAdminLessonModalVisible: true,
                isAdminEdit : true,
                isAdminUpdate : false,
                modalDate: slotInfo.start.toLocaleString(),
                lessonDetail : {
                    createdBy : this.state.userName
                }
            });
        }
        // alert(
        //     `Hey dude you selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        //         `\nend: ${slotInfo.end.toLocaleString()}` +
        //         `\naction: ${slotInfo.action}`
        //     )
    }

    handleSaveLesson = async (values, date) => {

        const lessonDto = calendarUtil.formatLessonDto(values, date);
        
        let newLesson = await this.props.saveNewLesson(lessonDto);
        newLesson = calendarUtil.formatForBigCal(newLesson);
        this.props.lessons.push(newLesson)
     
        this.setState({
            lessons: this.props.lessons,
            isAdminLessonModalVisible: false
        })
  
    }

    handleUpdateLesson = async (values, lessonId, volunteerSignUp) => {

        let lessonDto = calendarUtil.formatLessonDto(values, null, volunteerSignUp ) 
        
        let updatedLesson = await this.props.updateLesson(lessonDto, lessonId);
        let oldLessonIndx = _.findIndex(this.props.lessons, {_id : lessonId} );

        updatedLesson = calendarUtil.formatForBigCal(updatedLesson);
        this.props.lessons.splice(oldLessonIndx, 1, updatedLesson);

        this.setState({
            lessons: this.props.lessons,
            isAdminLessonModalVisible: false,
            isVolunteerLessonModalVisible: false
        })
    }

    closeModal = () => {
        this.setState({
            isAdminLessonModalVisible : false,
            isVolunteerLessonModalVisible : false
        })
    }
    
    render() {

        for(let i = 0; i < this.props.lessons.length; i++){
            let currentLesson = this.props.lessons[i];
            currentLesson = calendarUtil.formatForBigCal(currentLesson);
        }
        
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

                <VolunteerLessonModal
                    isModalVisible={this.state.isVolunteerLessonModalVisible}
                    isVolunteerEdit={this.state.isVolunteerEdit}
                    modalDate={this.state.modalDate}
                    lessonDetail={this.state.lessonDetail}
                    handleUpdateLesson={this.handleUpdateLesson}
                    userName={this.state.userName}
                    closeModal={this.closeModal}
                >
                </VolunteerLessonModal>  

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