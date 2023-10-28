import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'inputSlice',
  initialState: {
    data: { apt: '', zk: '' },
  },
  reducers: {
    setAptInput: (state, actions) => {
      state.data.apt = actions.payload;
    },
    setZkInput: (state, actions) => {
      state.data.zk = actions.payload;
    },
  },
});

export const { setAptInput, setZkInput } = inputSlice.actions;

export default inputSlice.reducer;
