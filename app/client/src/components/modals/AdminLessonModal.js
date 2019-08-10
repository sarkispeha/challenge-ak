import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Overlay } from 'react-modal-construction-kit';
import { reduxForm, Field } from 'redux-form';

// import NewLessonField from './NewLessonField';
// import newLessonFormFields from './newLessonFormFields';
import { timeOfDay } from '../../utils/timeUtils';
import '../../styles/modal.css';

let initialLessondata = {};

class AdminLessonModal extends Component {
    constructor(props){
        super(props);

        this.formProps = {};
        this.state = {
            isModalVisible: this.props.isModalVisible
          }
    }

    componentDidMount(){
        this.setFormProps();   
    }

    componentWillReceiveProps(nextProps) {
   
        if(nextProps !== this.props){
            this.setState({ 
                isModalVisible: nextProps.isModalVisible,
            });

            let {studentName, type, shadowNecessary, _id, createdBy} = nextProps.lessonDetail;
            initialLessondata._id = _id;
            initialLessondata.student_name = studentName;
            initialLessondata.lesson_type = type;
            initialLessondata.shadow_needed = shadowNecessary !== undefined ? shadowNecessary.toString() : '';
            initialLessondata.duration = timeOfDay(nextProps.lessonDetail);
            initialLessondata.created_by = createdBy;
        }
    }

    close = () => {       
        this.props.closeModal();
        this.props.reset(); //from redux-form baked-in props
    }

    // renderFields(){
    //     return _.map(newLessonFormFields, ({ label, name, type }) => { 
    //         return <Field component={NewLessonField} type={type} label={label} name={name} key={name} />
    //     })
    // }

    setFormProps(){
        if(this.props.isAdminUpdate){
            let lessonId = initialLessondata._id;
            this.formProps.submit = this.props.handleSubmit(values =>this.props.handleUpdateLesson(values, lessonId) );
        }else{
            this.formProps.submit = this.props.handleSubmit(values =>this.props.handleSaveLesson(values, this.props.modalDate) );
        }
    }

    renderNewOrUpdate(){
        // eslint-disable-next-line
        if(!this.props.isAdminUpdate){ return 'Submit'}else{ return 'Update'};
    }
    
    render(){

        this.setFormProps();//run on render as isAdminUpdate is passed as a prop and cannot be changed on conponentWillRecieveProps

        return (
            <div>
                <Modal
                    onClickOutside={this.close}
                    onClosed={this.close}
                    isOpen={this.state.isModalVisible}
                >
                    
                    <i onClick={this.close} className="close-icon material-icons right">close</i>
                    
                    <h5>Enter Lesson Details</h5>
                    <form onSubmit={this.formProps.submit}>
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
                                <Field className="override-radio" component="input" name="shadow_needed" type="radio" value="true"/>
                                <span>Yes</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <Field className="override-radio" component="input" name="shadow_needed" type="radio" value="false"/>
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
                        <Field component="input" name="created_by" type="hidden" />
                        <button type="submit">{this.renderNewOrUpdate()}</button>
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

AdminLessonModal = reduxForm({
        form: 'newLessonForm'
    })(AdminLessonModal);

AdminLessonModal = connect(
    state => ({
        initialValues: initialLessondata 
    })
)(AdminLessonModal)

export default AdminLessonModal;