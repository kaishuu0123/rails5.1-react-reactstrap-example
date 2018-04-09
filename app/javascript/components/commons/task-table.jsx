import React from 'react';
import {
  Table
} from 'reactstrap';

import TaskRow from './task-row'

class TaskTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tasks, getTasks, deleteTask } = this.props;

    return (
      <Table className="mt-sm-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(function (task, index) {
            return (
              <TaskRow
                key={index}
                id={task.id}
                title={task.title}
                description={task.description}
                getTasks={getTasks}
                deleteTask={deleteTask}
              />);
          }.bind(this))}
        </tbody>
      </Table>
    );
  }
}

export default TaskTable;