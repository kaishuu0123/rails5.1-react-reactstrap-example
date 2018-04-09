import React from 'react';
import { Button } from 'reactstrap';

class TaskRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, deleteTask } = this.props;

    return (
      <tr>
        <td>{title}</td>
        <td>{description}</td>
        <td className="text-right">
          <Button color="danger" onClick={() => deleteTask(this.props.id)}>Delete</Button>
        </td>
      </tr>
    )
  }
}

export default TaskRow;