import React from 'react';
import { Button } from 'reactstrap';

class TaskRow extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(id) {
    let request = new Request(`/api/v1/tasks/${this.props.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    fetch(request).then(function (response) {
      return response;
    }).then(() => {
      this.props.getTasks();
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
        <td className="text-right">
          <Button color="danger" onClick={() => this.deleteTask(this.props.id)}>Delete</Button>
        </td>
      </tr>
    )
  }
}

export default TaskRow;