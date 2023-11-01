import { createSlice } from '@reduxjs/toolkit';

export const loadSlice = createSlice({
  name: 'loadSlice',
  initialState: {
    data: { isLoading: false, totalCount: 0, loadedCount: 0, isDelay: false },
  },
  reducers: {
    setLoading: (state, actions) => {
      state.data.isLoading = true;
      state.data.totalCount = actions.payload;
    },
    setLoaded: (state) => {
      state.data.isLoading = false;
      state.data.totalCount = 0;
      state.data.loadedCount = 0;
    },
    incrementLoadedCount: (state) => {
      state.data.loadedCount++;
    },
    setDelay: (state, action) => {
      state.data.isDelay = action.payload;
    },
  },
});

export const { setLoading, setLoaded, incrementLoadedCount, setDelay } = loadSlice.actions;

export default loadSlice.reducer;
