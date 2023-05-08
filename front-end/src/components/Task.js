import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];

const Task = (props) => {
  const onStatusChange = (e) => {
    props.onStatusChange({ id: props.task.id, status: e.target.value });
  };
  const onDeleteTask = (e) => {
    props.onDeleteTask({ id: props.task.id });
  };

  return (
    <div className="task">
      <div className="task-header">
        <div>{props.task.title}</div>
        <select value={props.task.status} onChange={onStatusChange}>
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className="task-body">{props.task.description}</div>
      <div className="task-footer">
        <div onClick={onDeleteTask}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default Task;
