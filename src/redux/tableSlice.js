import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    data: { stark: [], zk: [] },
  },
  reducers: {
    setStarkTable: (state, actions) => {
      state.data.stark = [...state.data.stark, actions.payload];
    },
    updateStarkTable: (state, action) => {
      const idx = state.data.stark.findIndex((x) => x.number === action.payload.number);
      state.data.stark[idx] = action.payload;
    },
    clearStarkTable: (state) => {
      state.data.stark = [];
    },
  },
});

export const { setStarkTable, updateStarkTable, clearStarkTable } = tableSlice.actions;

export default tableSlice.reducer;
