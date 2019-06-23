import { createAction, createSlice } from 'redux-starter-kit';

const increment = createAction('increment');
const decrement = createAction('decrement');

export default createSlice({
  initialState: 0,
  reducers: {
    [increment.type]: (state) => state + 1,
    [decrement.type]: (state) => state - 1,
  },
  slice: 'App',
});
