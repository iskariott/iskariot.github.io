import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'inputSlice',
  initialState: {
    data: { stark: '', zk: '' },
  },
  reducers: {
    setStarkInput: (state, actions) => {
      state.data.stark = actions.payload;
    },
  },
});

export const { setStarkInput } = inputSlice.actions;

export default inputSlice.reducer;
