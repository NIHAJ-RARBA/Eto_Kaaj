import React, { Component } from 'react'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup
} from 'reactstrap';


class ModalElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }


    // Check if a button is checked or not
    changeState = (e) => {
        // Removed unnecessary destructuring
        const { name, value } = e.target;
    
        if (e.target.type === "checkbox") {
            // For checkboxes, use checked property instead of value
            this.setState(prevState => ({
                activeItem: {
                    ...prevState.activeItem,
                    [name]: e.target.checked,
                }
            }));
        } else {
            // For other input types, use the value property
            this.setState(prevState => ({
                activeItem: {
                    ...prevState.activeItem,
                    [name]: value,
                }
            }));
        }
    }



    render() {
        const { toggle, onSave } = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>

                <ModalHeader toggle={toggle}> Todo Item </ModalHeader>

                <ModalBody>

                    <Form>
                        <FormGroup>
                            <Label for='taskTitle'>Kajer Naam</Label>

                            <Input
                                type="text"
                                name="taskTitle"
                                value={this.state.activeItem.taskTitle}
                                onChange={this.changeState}
                                placeholder='Enter task title'
                            />

                        </FormGroup>


                        <FormGroup>

                            <Label for="taskDescription">Kajer Description?</Label>

                            <Input
                                type="textarea"
                                name="taskDescription"
                                value={this.state.activeItem.taskDescription}
                                onChange={this.changeState}
                                placeholder='Enter task description'
                            />

                        </FormGroup>


                        <FormGroup completed>
                            <Label for="completed">

                            <Input
                                type="checkbox"
                                name="completed"
                                checked={this.state.activeItem.completed}
                                onChange={this.changeState}
                            />
                            
                                Aagei Shesh?
                            
                            </Label>

                        </FormGroup>


                    </Form>

                </ModalBody>


                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeItem)}
                    >
                        Save
                    </Button>
                </ModalFooter>


            </Modal>
        );




    }





}



export default ModalElement;