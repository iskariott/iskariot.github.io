import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    data: [],
  },
  reducers: {
    setTable: (state, actions) => {
      state.data = [...state.data, actions.payload];
    },
    updateTable: (state, action) => {
      const idx = state.data.findIndex((x) => x.number === action.payload.number);
      state.data[idx] = action.payload;
    },
    clearTable: (state) => {
      state.data = [];
    },
  },
});

export const { setTable, updateTable, clearTable } = tableSlice.actions;

export default tableSlice.reducer;
