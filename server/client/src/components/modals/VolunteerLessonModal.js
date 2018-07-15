import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Modal, Overlay } from 'react-modal-construction-kit';

import { timeOfDay } from '../../utils/timeUtils';

let hiddenLessondata = {};

class VolunteerLessonModal extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalVisible: this.props.isModalVisible
          }
    }

    componentWillReceiveProps(nextProps) {
   
        if(nextProps !== this.props){
            this.setState({ 
                isModalVisible: nextProps.isModalVisible,
            });

            hiddenLessondata.instructor = nextProps.userName;
            hiddenLessondata.shadow = nextProps.userName;
        }
        
    }

    close = () => {       
        this.props.closeModal();
        // this.props.reset(); //from redux-form baked-in props
    }
    updateLessonForVolunteer(updateType, values){
        this.props.handleUpdateLesson(values, this.props.lessonDetail._id, updateType);
    }

    renderShadowButton(){
        if(this.props.lessonDetail.shadowNecessary){
            if(this.props.lessonDetail.shadow.length === 0){
                return (
                    <div>
                        <button type="submit">Shadow this Lesson</button>
                    </div>
                );
            }else{
                return (
                    <p>{this.props.lessonDetail.shadow}</p>
                );
            }
        }
        
    }

    renderInstructorSubmit() {
        let instructor = this.props.lessonDetail.instructor;
        
        if(instructor !== undefined) {
            if(instructor.length === 0){
                return (
                        <button type="submit">Sign Up</button>
                );
            }
        }
    }

    render(){

        return (
            <div>
                <Modal
                    onClickOutside={this.close}
                    onClosed={this.close}
                    isOpen={this.state.isModalVisible}
                >
                    <h5>Lesson Details</h5>
                    <p>
                        {this.props.modalDate}
                    </p>
                        {/* <label>Student Name</label> */}
                        {/* <p>{this.props.studentName}</p> */}
                        <label>Lead Instructor</label>
                        <p>{this.props.lessonDetail.instructor}</p>
                        <label>Duration</label>                   
                        <p>{timeOfDay(this.props.lessonDetail)}</p>
                        <label >Shadow Needed</label>  
                        <p>{this.props.lessonDetail.shadowNecessary ? 'Yes' : 'No' }</p>
                        <form onSubmit={this.props.handleSubmit(values => this.updateLessonForVolunteer('shadow', values) )}>
                            <Field component="input" name="shadow" type="hidden" />
                            {this.renderShadowButton()}
                        </form>
                        <label >Lesson Type</label>
                        <p>{this.props.lessonDetail.type}</p>
                    <form onSubmit={this.props.handleSubmit(values => this.updateLessonForVolunteer('instructor', values) )}>
                        <Field component="input" name="instructor" type="hidden" />
                        {this.renderInstructorSubmit()}
                    </form>
                </Modal>
                <Overlay
                isVisible={this.state.isModalVisible} />
            </div>
        )
    }
}
VolunteerLessonModal = reduxForm({
    form: 'volunteerLessonForm'
})(VolunteerLessonModal);

VolunteerLessonModal = connect(
    state => ({
        initialValues: hiddenLessondata 
    })
)(VolunteerLessonModal)

export default VolunteerLessonModal;