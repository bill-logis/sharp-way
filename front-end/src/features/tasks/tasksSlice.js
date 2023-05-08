import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newTask, removeTask, fetchTasks, updateTask } from '../../api';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.isLoading = false;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      return {
        tasks: state.tasks.concat(action.payload.newTask),
      };
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      return {
        tasks: state.tasks.filter((task) => task.id !== action.meta.arg.id),
      };
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.updateTask.id) {
            return Object.assign({}, task, {
              status: action.payload.updateTask.status,
            });
          }
          return task;
        }),
      };
    });
  },
});

export const fetchAllTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasks();
  return response.data;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (action, payload) => {
    const response = await newTask(action.title, action.description);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (action, payload) => {
    const response = await removeTask(action.id);
    return response.data;
  }
);

function getTaskById(tasks, id) {
  console.log('here');
  return tasks.find((task) => task.id === id);
}

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (dispatch, thunkAPI) => {
    console.log('dispatchh', dispatch);
    console.log('thunkAPI', thunkAPI);
    const task = getTaskById(thunkAPI.getState().tasks.tasks, dispatch.id);
    console.log('task', task);

    const updatedTask = Object.assign({}, task, dispatch);
    console.log('updatedTask', updatedTask);

    const response = await updateTask(updatedTask);
    return response.data;
  }
);

export default tasksSlice.reducer;
