import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    data: {
      apt: { wal: [], total: {} },
      zk: { wal: [], total: {} },
      stark: { wal: [], total: {} },
    },
  },
  reducers: {
    setAptTable: (state, actions) => {
      state.data.apt = { wal: actions.payload.wal, total: actions.payload.total };
    },
    updateAptTable: (state, action) => {
      const idx = state.data.apt.wal.findIndex((x) => x.id === action.payload.id);
      const aptTotal = state.data.apt.total;
      const aptWal = state.data.apt.wal;
      state.data.apt.total.gas =
        aptTotal.gas -
        Number(aptWal[idx].totalFee.slice(1)) +
        Number(action.payload.totalFee.slice(1));
      state.data.apt.total.balance =
        aptTotal.balance - aptWal[idx].totalBalance + action.payload.totalBalance;
      state.data.apt.wal[idx] = action.payload;
    },
    clearAptTable: (state) => {
      state.data.apt = { wal: [], total: {} };
    },
    setZkTable: (state, actions) => {
      state.data.zk = { wal: actions.payload.wal, total: actions.payload.total };
    },
    updateZkTable: (state, action) => {
      const idx = state.data.zk.wal.findIndex((x) => x.id === action.payload.id);
      const zkTotal = state.data.zk.total;
      const zkWal = state.data.zk.wal;
      state.data.zk.total.gas =
        zkTotal.gas -
        Number(zkWal[idx].totalFee.slice(1)) +
        Number(action.payload.totalFee.slice(1));
      state.data.zk.total.balance =
        zkTotal.balance - zkWal[idx].totalBalance + action.payload.totalBalance;
      state.data.zk.wal[idx] = action.payload;
    },
    clearZkTable: (state) => {
      state.data.zk = { wal: [], total: {} };
    },
    setStarkTable: (state, actions) => {
      state.data.stark = { wal: actions.payload.wal, total: actions.payload.total };
    },
    updateStarkTable: (state, action) => {
      const idx = state.data.stark.wal.findIndex((x) => x.id === action.payload.id);
      const starkTotal = state.data.stark.total;
      const starkWal = state.data.stark.wal;
      state.data.stark.total.gas =
        starkTotal.gas -
        Number(starkWal[idx].totalFee.slice(1)) +
        Number(action.payload.totalFee.slice(1));
      state.data.stark.total.balance =
        starkTotal.balance - starkWal[idx].totalBalance + action.payload.totalBalance;
      state.data.stark.wal[idx] = action.payload;
    },
    clearStarkTable: (state) => {
      state.data.stark = { wal: [], total: {} };
    },

    //-----------------------------------------
    resetTable: (state) => {
      state.data = {
        apt: { wal: [], total: {} },
        zk: { wal: [], total: {} },
        stark: { wal: [], total: {} },
      };
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

  // ------------------
  resetTable,
} = tableSlice.actions;

export default tableSlice.reducer;
