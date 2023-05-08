import React, { useEffect } from 'react';
import TasksPage from './components/TaskPage';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, fetchAllTasks } from './features/tasks/tasksSlice';

const App = (props) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tasks.length < 1) {
      dispatch(fetchAllTasks());
    }
  });

  const onCreateTask = ({ title, description }) => {
    // dispatch({ type: 'tasks/createTask', payload: { title, description } });
    dispatch(createTask({ title, description }));
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
