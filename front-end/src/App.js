import React, { useEffect } from 'react';
import TasksPage from './components/TaskPage';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTask,
  deleteTask,
  fetchAllTasks,
  editTask,
} from './features/tasks/tasksSlice';

const App = (props) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading);
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
    // dispatch({ type: 'tasks/editTask', payload: { id, status } });
    dispatch(editTask({ id, status }));
  };

  const onDeleteTask = ({ id }) => {
    console.log('delete task clicked:', id);
    dispatch(deleteTask({ id }));
  };

  return (
    <div className="main-content">
      <TasksPage
        tasks={tasks}
        onCreateTask={onCreateTask}
        onStatusChange={onStatusChange}
        onDeleteTask={onDeleteTask}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
