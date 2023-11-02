import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'inputSlice',
  initialState: {
    data: { apt: '', zk: '', stark: '' },
  },
  reducers: {
    setAptInput: (state, actions) => {
      state.data.apt = actions.payload;
    },
    setZkInput: (state, actions) => {
      state.data.zk = actions.payload;
    },
    setStarkInput: (state, actions) => {
      state.data.stark = actions.payload;
    },

    //-----------------------------------
    resetInput: (state) => {
      state.data = { apt: '', zk: '', stark: '' };
    },
  },
});

export const { setAptInput, setZkInput, setStarkInput, resetInput } = inputSlice.actions;

export default inputSlice.reducer;
