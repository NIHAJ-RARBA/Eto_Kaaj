import React, { Component } from 'react'

import './App.css';
import ModalElement from './Modal';
import { Modal } from 'reactstrap';
import axios from 'axios';







class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false, // modal is open or not
            viewCompleted: false, // t,ask is completed or not
            
            activeItem: {
                taskTitle: "",
                taskDescription: "",
                starred: false,
                completed: false
            },


            taskList:[],
        };

    }


    showCompletedTasks = status => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    }


    // toggle the modal

    toggleModal = () => {
        this.setState({ 
            modal: !this.state.modal,
            activeItem: {
                taskTitle: "",
                taskDescription: "",
                starred: false,
                completed: false
            }
        });
    };


    // fetch the tasks from the database

    refreshList = () => {
        axios
            .get("http://localhost:8000/api/tasks/")
            .then(res => this.setState({ taskList: res.data }))
            .catch(err => console.log(err));
    }
    
    componentDidMount() {
        this.refreshList();
    }




    // controls which set of tasks to show: completed or not completed

    chooseRenderTaskList = () => {
        return(
            <div className='my-5 choose-task-list'>
                <span 
                    className={this.state.viewCompleted ? 'active' : ''}
                    onClick={() => this.showCompletedTasks(true)}
                >
                    KORA SHESH!
                </span>
                    
                <span 
                    onClick={() => this.showCompletedTasks(false)}
                    className={this.state.viewCompleted ? '' : 'active'}
                >

                    KORA HOYNI!
                </span>
            </div>
        )
    }

    
    // sift to get the tasks to show
    // show the tasks in a list

    renderItems = () => {
        const { viewCompleted } = this.state; 
        const itemsToShow = this.state.taskList.filter(
            item => item.completed === viewCompleted
        );

        return itemsToShow.map(item => (
            <li
                key={item.id}
                className='list-group-item justify-content-between align-items-center d-flex'
                style={{ textAlign: 'center' }}
            >
                <span className={`tasks-list-showing mr-2 ${this.state.viewCompleted ? "Kora_Shesh" : "Kora_HoyNi"}`}
                    title={item.taskTitle}
                >
                    {item.taskTitle}
                </span>

                <div className='Kaj-Buttons'>
                    <span className='btn btn-info' onClick={() => this.editTask(item)}>Edit</span>
                    {!item.completed && (
                        <span className='btn btn-success' onClick={() => this.setTaskCompleted(item)}>Shesh(?!)</span>
                    )}
                    <span className='btn btn-danger' onClick={() => this.deleteTask(item)}>Delete</span>
                </div>
            </li>
        ));
    };




    // create, add, edit, delete tasks

    createTask = () => {
        const item = { taskTitle: "", taskDescription: "", starred: false, completed: false, modal: !this.state.modal};
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    submission = item => {
        this.toggleModal();
        if (item.id) {
            axios
                .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
                .then(res => this.refreshList());
        }
        else {
            axios
                .post("http://localhost:8000/api/tasks/", item)
                .then(res => this.refreshList());
        }
    };

    
    deleteTask = item => {
        if (item.id) {
            axios
                .delete(`http://localhost:8000/api/tasks/${item.id}/`)
                .then(res => this.refreshList());
        }

    };

    editTask = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    }

    setTaskCompleted = item => {
        item.completed = true;
        axios
            .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
            .then(res => this.refreshList());
    }



    // render the app

    
     render(){
        return(

            <div>
                <main className='MAIN content p-3 mb-2' style={{ backgroundColor: 'whitesmoke' }}>
                    <h1 className='text-black text-uppercase text-center my-5'>
                        ETO KAAJ!!
                    </h1>


                    <div className='row-separation'>

                        <div className='col-md-8 col-sma-25 mx-auto p-0' style={{ width: '100%' }}>

                            <div className='card p-2' style={{ padding: '0', margin: '0' }}>

                                <button className='btn btn-warning' style={{ cursor: 'pointer', fontSize: '20px' }} onClick={this.toggleModal}>
                                    Notun Kaj?
                                </button>

                            </div>

                            {this.chooseRenderTaskList()}


                            <ol className='list-group list-group-flush'>
                                {this.renderItems()}
                            </ol>

                        </div>

                    </div>



                    {this.state.modal ? (
                        <ModalElement
                            activeItem={this.state.activeItem}
                            toggle={this.toggleModal}
                            onSave={this.submission}
                        />
                    ) : (null)}

                    <footer className='pb-3 my-3 mb-2 text-black text-center'> Copyright 2023 &copy; All Rights Reserved    </footer>
                </main>
            </div>
            
        );
     }



}

export default App;
