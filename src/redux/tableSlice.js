import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    data: { apt: [], zk: [] },
  },
  reducers: {
    setAptTable: (state, actions) => {
      state.data.apt = [...state.data.apt, actions.payload];
    },
    updateAptTable: (state, action) => {
      const idx = state.data.apt.findIndex((x) => x.number === action.payload.number);
      state.data.apt[idx] = action.payload;
    },
    clearAptTable: (state) => {
      state.data.apt = [];
    },
    setZkTable: (state, actions) => {
      state.data.zk = [...state.data.zk, actions.payload];
    },
    updateZkTable: (state, action) => {
      const idx = state.data.zk.findIndex((x) => x.number === action.payload.number);
      state.data.zk[idx] = action.payload;
    },
    clearZkTable: (state) => {
      state.data.zk = [];
    },
  },
});

export const {
  setAptTable,
  updateAptTable,
  clearAptTable,
  setZkTable,
  updateZkTable,
  clearZkTable,
} = tableSlice.actions;

export default tableSlice.reducer;
