import React, { useEffect } from 'react';
import TasksPage from './components/TaskPage';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTask,
  deleteTask,
  fetchAllTasks,
  editTask,
} from './features/tasks/tasksSlice';
import { fetchAllProjects } from './features/projects/projectsSlice';
import Header from './components/Header';

const App = (props) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const projects = useSelector((state) => state.projects.projects);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const dispatch = useDispatch();
  const [currentProjectId, setCurrentProjectId] = useState('');

  useEffect(() => {
    if (tasks.length < 1) {
      dispatch(fetchAllTasks());
    }
    if (projects.length < 1) {
      dispatch(fetchAllProjects());
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

  const onCurrentProjectChange = (e) => {
    console.log('currentProjectId', currentProjectId);
    setCurrentProjectId(e.target.value);
  };

  return (
    <div className="main-content">
      <Header
        projects={projects}
        onCurrentProjectChange={onCurrentProjectChange}
      />
      <TasksPage
        tasks={tasks}
        projects={projects}
        onCreateTask={onCreateTask}
        onStatusChange={onStatusChange}
        onDeleteTask={onDeleteTask}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
