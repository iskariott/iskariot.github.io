import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    data: { rows: [] },
  },
  reducers: {
    setTable: (state, actions) => {
      state.data = [...state.data, actions.payload];
    },
    clearTable: (state) => {
      state.data = [];
    },
  },
});

export const { setTable, clearTable } = tableSlice.actions;

export default tableSlice.reducer;
