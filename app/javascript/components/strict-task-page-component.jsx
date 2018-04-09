import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col } from 'reactstrap';

import Header from './header';
import TaskForm from './commons/task-form';
import TaskTable from './commons/task-table';

import { TOASTER_ERROR_OPTION } from '../consts/toaster-style'

class TaskPageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      strictTasks: []
    }

    this.getStrictTasks = this.getStrictTasks.bind(this);
    this.createStrictTask = this.createStrictTask.bind(this);
    this.deleteStrictTask = this.deleteStrictTask.bind(this);
  }

  componentDidMount() {
    this.getStrictTasks()
  }

  getStrictTasks() {
    const token = localStorage.getItem('access_token');

    let request = new Request('/api/v1/strict_tasks', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });

    fetch(request).then(function (response) {
      if (!response.ok) {
        throw Error(`[GET Task] ${response.status} ${response.statusText}`);
      }

      return response.json();
    }).then(function (tasks) {
      this.setState({
        strictTasks: tasks
      });
    }.bind(this)).catch(function (error) {
      toast.error(error.toString(), TOASTER_ERROR_OPTION);
    });
  }

  createStrictTask(event, title, description, clearCallback) {
    const token = localStorage.getItem('access_token');

    event.preventDefault();

    let request = new Request('/api/v1/strict_tasks', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify({
        title: title,
        description: description
      })
    });

    fetch(request).then(function (response) {
      if (!response.ok) {
        throw Error(`[POST Task] ${response.status} ${response.statusText}`);
      }

      return response.json();
    }).then((task) => {
      this.getStrictTasks();
    }).catch(function (error) {
      toast.error(error.toString(), TOASTER_ERROR_OPTION);
    }).finally(() => {
      clearCallback();
    });
  }

  deleteStrictTask(id) {
    const token = localStorage.getItem('access_token');

    let request = new Request(`/api/v1/strict_tasks/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    });

    fetch(request).then(function (response) {
      return response;
    }).then(() => {
      this.getStrictTasks();
    }).catch(function (error) {
      toast.error(error.toString(), TOASTER_ERROR_OPTION);
    });
  }

  render() {
    const { tasks, strictTasks } = this.state;

    return (
      <div>
        <Header title='Rails 5.1 + webpacker + React + Reactstrap Example' />
        <Container className="mt-sm-4">
          <h2>Strict Task(authentication required)</h2>
          <TaskForm getTasks={this.getStrictTasks} createTask={this.createStrictTask} />
          <TaskTable
            tasks={strictTasks}
            getTasks={this.getStrictTasks}
            deleteTask={this.deleteStrictTask}
          />
        </Container>
        <ToastContainer />
      </div>
    )
  }
}

export default TaskPageComponent