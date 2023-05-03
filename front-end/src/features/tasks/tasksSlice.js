import { createSlice } from '@reduxjs/toolkit';

const tempTasks = [
  {
    id: 1,
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress',
  },
];

const initialState = {
  tasks: tempTasks,
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
    createTask: (state, action) => {
      state.tasks.push({
        id: generate_uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        status: 'Unstarted',
      });
    },
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
  },
});

export const { createTask } = tasksSlice.actions;

export default tasksSlice.reducer;
