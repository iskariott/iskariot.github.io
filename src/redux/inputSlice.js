import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'inputSlice',
  initialState: {
    data: '',
  },
  reducers: {
    set: (state, actions) => {
      state.data = actions.payload;
    },
    clear: (state) => {
      state.data = '';
    },
  },
});

export const { set, clear } = inputSlice.actions;

export default inputSlice.reducer;
