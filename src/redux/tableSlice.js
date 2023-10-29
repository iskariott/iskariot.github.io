import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    data: { apt: [], zk: [], stark: [] },
  },
  reducers: {
    setAptTable: (state, actions) => {
      state.data.apt = [...state.data.apt, actions.payload];
    },
    updateAptTable: (state, action) => {
      const idx = state.data.apt.findIndex((x) => x.id === action.payload.id);
      state.data.apt[idx] = action.payload;
    },
    clearAptTable: (state) => {
      state.data.apt = [];
    },
    setZkTable: (state, actions) => {
      state.data.zk = [...state.data.zk, actions.payload];
    },
    updateZkTable: (state, action) => {
      const idx = state.data.zk.findIndex((x) => x.id === action.payload.id);
      state.data.zk[idx] = action.payload;
    },
    clearZkTable: (state) => {
      state.data.zk = [];
    },
    setStarkTable: (state, actions) => {
      state.data.stark = [...state.data.stark, actions.payload];
    },
    updateStarkTable: (state, action) => {
      const idx = state.data.stark.findIndex((x) => x.id === action.payload.id);
      state.data.stark[idx] = action.payload;
    },
    clearStarkTable: (state) => {
      state.data.stark = [];
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
  setStarkTable,
  updateStarkTable,
  clearStarkTable,
} = tableSlice.actions;

export default tableSlice.reducer;
