import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import Header from './header';
import TaskForm from './commons/task-form';
import TaskTable from './commons/task-table';

import { TOASTER_ERROR_OPTION } from '../consts/toaster-style'

class TaskPageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
    }

    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    let tokens = queryString.parse(get(this, "props.location.search"));
    if (!isEmpty(tokens)) {
      localStorage.setItem('access_token', tokens.access_token)
    }
    this.getTasks();
  }

  getTasks() {
    let request = new Request('/api/v1/tasks', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request).then(function (response) {
      if (!response.ok) {
        throw Error(`[GET Task] ${response.status} ${response.statusText}`);
      }

      return response.json();
    }).then(function (tasks) {
      this.setState({
        tasks: tasks
      });
    }.bind(this)).catch(function (error) {
      toast.error(error.toString(), TOASTER_ERROR_OPTION);
    });
  }

  createTask(event, title, description, clearCallback) {
    let request = new Request('/api/v1/tasks', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
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
      this.getTasks();
    }).catch(function (error) {
      toast.error(error.toString(), TOASTER_ERROR_OPTION);
    }).finally(() => {
      clearCallback();
    });

    event.preventDefault();
  }

  deleteTask(id) {
    let request = new Request(`/api/v1/tasks/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    fetch(request).then(function (response) {
      return response;
    }).then(() => {
      this.getTasks();
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
          <h2>Task (authentication NOT required)</h2>
          <TaskForm getTasks={this.getTasks} createTask={this.createTask} />
          <TaskTable
            tasks={tasks}
            getTasks={this.getTasks}
            deleteTask={this.deleteTask}
          />
        </Container>
        <ToastContainer />
      </div>
    )
  }
}

export default TaskPageComponent