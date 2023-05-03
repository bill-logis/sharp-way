import React from 'react';
import TasksPage from './components/TaskPage';
import { useSelector, useDispatch } from 'react-redux';

const App = (props) => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();

  const onCreateTask = ({ title, description }) => {
    dispatch({ type: 'tasks/createTask', payload: { title, description } });
  };

  const onStatusChange = ({ id, status }) => {
    console.log(`id: ${id} status: ${status}`);
    dispatch({ type: 'tasks/editTask', payload: { id, status } });
  };

  return (
    <div className="main-content">
      <TasksPage
        tasks={tasks}
        onCreateTask={onCreateTask}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default App;
