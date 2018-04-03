import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

class TaskForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: ''
    }
    this.createTask = this.createTask.bind(this);
  }

  createTask(event) {
    let request = new Request('/api/v1/tasks', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    });

    fetch(request).then(function (response) {
      return response.json();
    }).then((task) => {
      this.props.getTasks();
    }).catch(function (error) {
      console.error(error);
    }).finally(() => {
      this.setState({
        title: '',
        description: ''
      })
    });

    event.preventDefault();
  }

  render() {
    let { title, description } = this.state;

    return (
      <Form inline onSubmit={this.createTask}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Title</Label>
          <Input
            type="text" value={title}
            placeholder="Title"
            onChange={(e) => {
              this.setState({
                title: e.target.value
              })
            }}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Description</Label>
          <Input
            type="text" value={description}
            placeholder="Description"
            onChange={(e) => {
              this.setState({
                description: e.target.value
              })
            }}
          />
        </FormGroup>
        <Button>Create Task</Button>
      </Form>
    )
  }
}

export default TaskForm;