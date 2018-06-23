import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import NewLessonModal from './modals/NewLessonModal';
// import SignUpLessonModal from './modals/SignUpLessonModal';
import * as timeUtil from '../utils/timeUtils';
import * as actions from '../actions';
import { firebase, user } from '../firebase';

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class LessonCalendar extends Component {

    constructor(props){
        super();
        this.state = {
            isModalVisible: false,
            modalTitle: '',
            isAdminEdit: false,
            isVolunteerEdit: false
          }
    }

    componentDidMount() {  

        this.props.fetchLessons();

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

    selectSlot = (slotInfo) => {

        if(this.state.userPermissions === 'admin'){
            //show NewLessonModal
            this.setState({
                isNewLessonModalVisible: true,
                modalDate: slotInfo.start.toLocaleString()
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
            isNewLessonModalVisible: false
        })
        console.log('AFTER SAVE PROPS', this.props);     
    }
    
    render() {
        // const { isModalVisible } = this.state
        return (
            <div>
              
                <NewLessonModal
                    isModalVisible={this.state.isNewLessonModalVisible}
                    isAdminEdit={this.state.isAdminEdit}
                    isVolunteerEdit={this.state.isVolunteerEdit}
                    modalDate={this.state.modalDate}
                    handleSaveLesson={this.handleSaveLesson}
                >
                </NewLessonModal>

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

// const roleBased = true;
// const authCondition = (authUser) => authUser.role === 'admin' ;

// export default compose(
//   withAuthorization(authCondition, roleBased),
//   connect(mapStateToProps, actions)
// )(LessonCalendar);