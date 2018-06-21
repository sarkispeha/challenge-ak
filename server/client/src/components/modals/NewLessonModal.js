import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Overlay } from 'react-modal-construction-kit';
import { reduxForm, Field } from 'redux-form';

import NewLessonField from './NewLessonField';
import newLessonFormFields from './newLessonFormFields';
import '../../styles/modal.css';

class NewLessonModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalVisible: this.props.isModalVisible
          }
    }
    componentDidUpdate(prevProps) {
        if (this.props!== prevProps) {
            this.setState({
                isModalVisible: this.props.isModalVisible
            });
        }

    close = () => {
        this.setState({ 
            isModalVisible: false
        })
    }

    renderFields(){
        return _.map(newLessonFormFields, ({ label, name, type }) => { 
            return <Field component={NewLessonField} type={type} label={label} name={name} key={name} />
        })
    }
    
    render(){

        return (
            <div>
                <Modal
                    onClickOutside={this.close}
                    onClosed={this.close}
                    isOpen={this.state.isModalVisible}
                >
                    <h5>Enter Lesson Details</h5>
                    <form onSubmit={this.props.handleSubmit(values =>this.props.handleSaveLesson(values, this.props.modalDate) )}>
                        {/* {this.renderFields()} */}
                        <label>Student Name</label>
                        <Field component="input" name="student_name" type="text" />
                        <div className="radio-component"> 
                            <label>Duration</label>                   
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="duration" type="radio" value="AM"/>
                                <span>AM</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="duration" type="radio" value="PM"/>
                                <span>PM</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="duration" type="radio" value="allDay"/>
                                <span>Full Day</span>
                            </label>
                            </p>
                        </div>


                        <div className="radio-component"> 
                            <label >Shadow Needed</label>                   
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="shadow" type="radio" value="true"/>
                                <span>Yes</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="shadow" type="radio" value="false"/>
                                <span>No</span>
                            </label>
                            </p>
                        </div>

                        <div className="radio-component"> 
                            <label >Lesson Type</label>                   
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="lesson_type" type="radio" value="ski"/>
                                <span>ski</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="lesson_type" type="radio" value="snowboard"/>
                                <span>snowboard</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="lesson_type" type="radio" value="sit_ski"/>
                                <span>sit ski</span>
                            </label>
                            </p>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <p>
                        {this.props.modalDate}
                    </p>
                </Modal>
                <Overlay
                isVisible={this.state.isModalVisible} />
            </div>
        )
    }
}

NewLessonModal = reduxForm({
        form: 'newLessonForm'
    })(NewLessonModal);
export default NewLessonModal;