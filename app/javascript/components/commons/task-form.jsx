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

    this.clearCallback = this.clearCallback.bind(this);
  }

  clearCallback() {
    this.setState({
      title: '',
      description: ''
    })
  }

  render() {
    let { title, description } = this.state;
    const { createTask } = this.props;

    return (
      <Form onSubmit={event => createTask(event, title, description, this.clearCallback)}>
        <FormGroup className="mb-2 mr-sm-2">
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
        <FormGroup className="mb-2 mr-sm-2">
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