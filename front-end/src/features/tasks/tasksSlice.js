import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newTask, removeTask, fetchTasks } from '../../api';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

let _id = 1;
export function uniqueId() {
  return _id++;
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    editTask: (state, action) => {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return Object.assign({}, task, {
              status: action.payload.status,
            });
          }
          return task;
        }),
      };
    },
    fetchTasksSucceeded: (state, action) => {
      return {
        tasks: action.payload.tasks,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
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
  },
});

export const { editTask } = tasksSlice.actions;

export const fetchAllTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasks();
  console.log('response', response);
  return response.data;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (action, payload) => {
    console.log('payload', payload);
    console.log('action', action);
    const response = await newTask(action.title, action.description);
    console.log('response', response);
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

export default tasksSlice.reducer;
