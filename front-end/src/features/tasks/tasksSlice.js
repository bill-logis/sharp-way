import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newTask, fetchTasks } from '../../api';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

let _id = 1;
export function uniqueId() {
  return _id++;
}

function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0,
      v = c == 'x' ? uuid : (uuid & 0x3) | 0x8;
    return uuid.toString(16);
  });
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // createTask: (state, action) => {
    //   state.tasks.push({
    //     id: generate_uuidv4(),
    //     title: action.payload.title,
    //     description: action.payload.description,
    //     status: 'Unstarted',
    //   });
    // },
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

export default tasksSlice.reducer;
