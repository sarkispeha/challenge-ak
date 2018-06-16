import React, { Component } from 'react';

import { Modal, Overlay } from 'react-modal-construction-kit';

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
    }

    close = () => {
        this.setState({ 
            isModalVisible: false
        })
    }
    
    render(){
        return (
            <div>
                <Modal
                    onClickOutside={this.close}
                    onClosed={this.close}
                    isOpen={this.state.isModalVisible}>
                    <h5>Enter Lesson Details</h5>
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
export default NewLessonModal;