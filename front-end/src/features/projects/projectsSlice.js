import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProjects } from '../../api';

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload.projects;
      state.isLoading = false;
    });
  },
});

export const fetchAllProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await fetchProjects();
    return response.data;
  }
);

export default projectsSlice.reducer;
