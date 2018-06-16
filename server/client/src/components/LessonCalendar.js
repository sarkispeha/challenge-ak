import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NewLessonModal from './modals/NewLessonModal'

import { fetchLessons } from '../actions';


//make moment helper
// let test = moment.unix(1528920360).format("YYYY, MM, DD")
//new Date(test)

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
        console.log('GETTING LESSONS FROM COMPONENTDIDMOUNT');    
        this.props.fetchLessons(); 
    }

    

    onBtnOpenModalClick = (slotInfo) => {
        this.setState({
            isModalVisible: true,
            modalTitle: slotInfo.start.toLocaleString()
        })
        console.log('LESSON STATE: ', this.state);
        
    }

    selectSlot = (slotInfo) => {
        // this.onBtnOpenModalClick(slotInfo);
        this.setState({
            isModalVisible: true,
            modalDate: slotInfo.start.toLocaleString()
        })
        console.log('LESSON STATE: ', this.state);
        // alert(
        //     `Hey dude you selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        //         `\nend: ${slotInfo.end.toLocaleString()}` +
        //         `\naction: ${slotInfo.action}`
        //     )
    }
    
    render() {

        // const { isModalVisible } = this.state
        return (
            <div>
              
                <NewLessonModal
                    isModalVisible={this.state.isModalVisible}
                    modalDate={this.state.modalDate}
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
    console.log('MAPSTATETOPROPS LESSONSTATE', state.lessonState);    
    return {lessons: state.lessonState}
}

export default connect(mapStateToProps, { fetchLessons })(LessonCalendar);